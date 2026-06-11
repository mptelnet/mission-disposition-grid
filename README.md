# Mission Disposition Grid

Interactive grid for Warhammer 40k mission dispositions and card previews.

**Live site:** https://mptelnet.github.io/mission-disposition-grid/

**Shared army list link:** https://mptelnet.github.io/mission-disposition-grid/?sheetUrl=https%3A%2F%2Fscript.google.com%2Fmacros%2Fs%2FAKfycbxe1bdpf1pOXWU1WT3_6paAvb3TcSC_t4fspRMKtuQgnfX1DWL_OTHm5oKYK_1y67c2fg%2Fexec

To update the site after editing `disposition_grid.html`, copy it to `index.html` and push.

## Google Sheets sync (shared army lists)

The Army List Tracker can load and save rows to a shared Google Sheet so multiple people see the same data.

### Setup (already deployed)

The group Apps Script web app is configured in the page by default. Click **Load from Sheet** or **Save to Sheet** to sync.

To redeploy or change the backend:

1. Open the group's [Google Sheet](https://sheets.google.com) → **Extensions → Apps Script**.
2. Use the code in `google-apps-script/Code.gs`.
3. **Deploy → Manage deployments → Edit → New version → Deploy** (access: **Anyone**).
4. Update `DEFAULT_SHEET_SCRIPT_URL` in `disposition_grid.html` if the `/exec` URL changes.

### Sharing with your group

- Share the Google Sheet with edit access for anyone who should update army lists.
- Share the **Shared army list link** above (or the live site — the script URL is pre-filled).
- Turn on **Auto-refresh every 30s** to pick up changes other people save.

### Notes

- **Save to Sheet** overwrites the `Army Lists` tab with the editable rows from the page (example rows are not synced).
- The script URL is remembered in your browser via `localStorage`.
- If load/save fails, redeploy the Apps Script and confirm access is set to **Anyone**.
