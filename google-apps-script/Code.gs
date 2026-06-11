const SHEET_NAME = "Army Lists";
const HEADERS = [
  "Player",
  "Faction",
  "Detachment 1",
  "Detachment 2",
  "Disposition",
  "PRIORITY ASSETS",
  "DISRUPTION",
  "RECONNAISSANCE",
  "TAKE AND HOLD",
  "PURGE THE FOE"
];

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
  }

  return sheet;
}

function rowToObject_(row) {
  return {
    player: String(row[0] || ""),
    faction: String(row[1] || ""),
    detachment1: String(row[2] || ""),
    detachment2: String(row[3] || ""),
    disposition: String(row[4] || ""),
    priority: String(row[5] || ""),
    disruption: String(row[6] || ""),
    recon: String(row[7] || ""),
    takehold: String(row[8] || ""),
    purge: String(row[9] || "")
  };
}

function objectToRow_(row) {
  return [
    row.player || "",
    row.faction || "",
    row.detachment1 || "",
    row.detachment2 || "",
    row.disposition || "",
    row.priority || "",
    row.disruption || "",
    row.recon || "",
    row.takehold || "",
    row.purge || ""
  ];
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  const rows = values
    .slice(1)
    .map(rowToObject_)
    .filter(function(row) {
      return Object.keys(row).some(function(key) {
        return String(row[key]).trim();
      });
    });

  return jsonResponse_({ rows: rows });
}

function doPost(e) {
  const body = JSON.parse(e.postData.contents || "{}");
  const rows = Array.isArray(body.rows) ? body.rows : [];
  const sheet = getSheet_();

  sheet.clearContents();
  sheet.appendRow(HEADERS);
  rows.forEach(function(row) {
    sheet.appendRow(objectToRow_(row));
  });

  return jsonResponse_({ ok: true, count: rows.length });
}
