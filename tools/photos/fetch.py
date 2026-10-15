"""Search free-licence photo libraries and download candidates (runs on GitHub Actions)."""
import io, json, os, re, sys, time, urllib.parse, urllib.request
from PIL import Image

UA = 'TwoWorldsMicrosite/1.0 (personal non-commercial project; github.com/lineccepibile/ournexttrip)'
OUT = os.environ.get('OUT', 'tools/photos/candidates')
FREE = re.compile(r'^(cc0|cc[- ]?by|public domain|pd|cc[- ]?by[- ]?sa)', re.I)

def get(url, binary=False):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=40) as r:
        data = r.read()
    return data if binary else json.loads(data)

def strip(html):
    return re.sub(r'<[^>]+>', '', html or '').strip()

def commons(q, n=6):
    api = 'https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode({
        'action': 'query', 'format': 'json', 'generator': 'search', 'gsrnamespace': 6,
        'gsrsearch': f'{q} filetype:bitmap', 'gsrlimit': n * 2, 'prop': 'imageinfo',
        'iiprop': 'url|size|extmetadata', 'iiurlwidth': 1600,
        'iiextmetadatafilter': 'Artist|LicenseShortName|ImageDescription'})
    pages = sorted(get(api).get('query', {}).get('pages', {}).values(), key=lambda p: p.get('index', 99))
    for p in pages:
        ii = p['imageinfo'][0]
        md = ii.get('extmetadata', {})
        lic = md.get('LicenseShortName', {}).get('value', '')
        if ii['width'] < 1600 or ii['width'] < ii['height'] * 0.9 or not FREE.match(lic):
            continue
        yield {'source': 'commons', 'title': p['title'], 'img': ii['thumburl'], 'page': ii['descriptionurl'],
               'author': strip(md.get('Artist', {}).get('value', '')), 'license': lic,
               'w': ii['width'], 'h': ii['height']}

def openverse(q, n=6):
    api = 'https://api.openverse.org/v1/images/?' + urllib.parse.urlencode({
        'q': q, 'page_size': n * 2, 'size': 'large', 'aspect_ratio': 'wide', 'mature': 'false'})
    for r in get(api).get('results', []):
        if r.get('license') in ('by-nc', 'by-nc-sa', 'by-nc-nd', 'by-nd', 'sampling+', 'nc-sampling+'):
            continue
        yield {'source': 'openverse/' + (r.get('provider') or ''), 'title': r.get('title') or '', 'img': r['url'],
               'page': r.get('foreign_landing_url') or '', 'author': r.get('creator') or '',
               'license': f"CC {r['license'].upper()} {r.get('license_version') or ''}".replace('CC PDM', 'Public domain').replace('CC CC0', 'CC0').strip(),
               'w': r.get('width') or 0, 'h': r.get('height') or 0}

def save(item, path, width):
    data = get(item['img'], binary=True)
    im = Image.open(io.BytesIO(data)).convert('RGB')
    if im.width < 1200:
        raise ValueError('too small')
    im.thumbnail((width, width * 2))
    im.save(path, 'JPEG', quality=82, optimize=True, progressive=True)

def candidates():
    slots = json.load(open('tools/photos/slots.json'))
    for slot, queries in slots.items():
        os.makedirs(f'{OUT}/{slot}', exist_ok=True)
        found, seen = [], set()
        for q in queries:
            for gen in (openverse, commons):
                try:
                    for it in gen(q):
                        if it['img'] in seen: continue
                        seen.add(it['img'])
                        found.append(it)
                        if sum(1 for f in found if f['source'].split('/')[0] == it['source'].split('/')[0]) >= 4: break
                except Exception as e:
                    print('search fail', slot, q, gen.__name__, e)
                time.sleep(0.5)
        kept = []
        for it in found[:18]:
            n = len(kept)
            try:
                save(it, f'{OUT}/{slot}/{n:02d}.jpg', 520)
                kept.append(it)
            except Exception as e:
                print('download fail', slot, it['img'][:90], e)
            time.sleep(0.3)
        json.dump(kept, open(f'{OUT}/{slot}/meta.json', 'w'), indent=1, ensure_ascii=False)
        print(slot, len(kept))

def finals():
    picks = json.load(open('tools/photos/picks.json'))
    os.makedirs('public/photos', exist_ok=True)
    cpath = 'src/data/photo-credits.json'
    credits = json.load(open(cpath)) if os.path.exists(cpath) else {}
    for slot, idx in picks.items():
        src, idx = idx.split('/') if isinstance(idx, str) else (slot, idx)
        it = json.load(open(f'{OUT}/{src}/meta.json'))[int(idx)]
        save(it, f'public/photos/{slot}.jpg', 1600)
        im = Image.open(f'public/photos/{slot}.jpg'); im.thumbnail((800, 1600)); im.save(f'public/photos/{slot}-800.jpg', 'JPEG', quality=80, optimize=True, progressive=True)
        credits[slot] = {k: it[k] for k in ('title', 'author', 'license', 'page', 'source')}
        print('final', slot)
    json.dump(credits, open(cpath, 'w'), indent=1, ensure_ascii=False)

if __name__ == '__main__':
    finals() if 'finals' in sys.argv else candidates()
