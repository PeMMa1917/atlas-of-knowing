#!/usr/bin/env python3
"""Build simulated gviz JSONP payloads for test_explorer.js.

Usage:  python3 make_payloads.py
Needs:  ../IB_LangLit_Master_Activity_Database_v3.xlsx (new shape)
        an original 12-column export as ib_db.xlsx (legacy shape), optional
Writes: gviz_new.json, gviz_oldA.json, gviz_oldB.json
"""
import json
import os
import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))

def payload(df, labels=True, header_in_rows=False):
    cols = [{'id': chr(65 + i % 26),
             'label': c if labels else '',
             'type': 'number' if c == 'Time (min)' else 'string'}
            for i, c in enumerate(df.columns)]
    rows = []
    if header_in_rows:
        rows.append({'c': [{'v': c} for c in df.columns]})
    for _, r in df.iterrows():
        cells = []
        for c in df.columns:
            v = r[c]
            if c == 'Time (min)' and not header_in_rows:
                cells.append({'v': float(v)})
            else:
                cells.append({'v': None if pd.isna(v) else str(v)})
        rows.append({'c': cells})
    return {'version': '0.6', 'reqId': '0', 'status': 'ok',
            'table': {'cols': cols, 'rows': rows}}

new = pd.read_excel(os.path.join(HERE, '..', 'IB_LangLit_Master_Activity_Database_v3.xlsx'),
                    sheet_name='Activities')
json.dump(payload(new), open(os.path.join(HERE, 'gviz_new.json'), 'w'))
print('gviz_new.json:', len(new), 'rows')

legacy_path = os.path.join(HERE, 'ib_db.xlsx')
if os.path.exists(legacy_path):
    old = pd.read_excel(legacy_path, sheet_name='Activities')
    json.dump(payload(old), open(os.path.join(HERE, 'gviz_oldA.json'), 'w'))
    json.dump(payload(old, labels=False, header_in_rows=True),
              open(os.path.join(HERE, 'gviz_oldB.json'), 'w'))
    print('legacy payloads:', len(old), 'rows')
else:
    print('no legacy ib_db.xlsx found — skipped legacy payloads')
