import * as cheerio from "cheerio";
import fetch from "node-fetch";

export async function fetchLinks(obj) {
  let { url } = obj;
  let links = [];
  try {
    let response = await fetch(url);
    let body = await response.text();
    let $ = await cheerio.load(body);
    let $a = $("a");
    $a.each((index, element) => {
      links.push({
        text: $(element).text(),
        href: $(element).attr("href"),
      });
    });
    return { Htm: body, Json: links, Type: "link" };
  } catch (e) {
    console.log(e);
    return { error: e };
  }
}
export async function fetchTable(obj) {
  let { url } = obj;
  try {
    let response = await fetch(url);
    let body = await response.text();
    const $ = cheerio.load(body);
    const scrapedData = [];
    const tableHeaders = [];
    $("table > tbody > tr").each((index, element) => {
      if (index === 0) {
        const ths = $(element).find("th");
        $(ths).each((i, element) => {
          tableHeaders.push($(element).text().toLowerCase());
        });
        return true;
      }
      const tds = $(element).find("td");
      const tableRow = {};
      $(tds).each((i, element) => {
        tableRow[tableHeaders[i]] = $(element).text();
      });
      scrapedData.push(tableRow);
    });
    let tableHtm = $("table").html();
    return { Htm: body, Json: scrapedData, queryHtm: tableHtm, Type: "table" };
  } catch (e) {
    console.log(e);
    return { error: e };
  }
}
export async function fetchImages(obj) {
  let { url } = obj;
  let links = [];
  try {
    let response = await fetch(url);
    let body = await response.text();
    let $ = await cheerio.load(body);
    let $img = $("img");
    $img.each((index, element) => {
      links.push({
        src: $(element).attr("src"),
        alt: $(element).attr("alt"),
      });
    });
    console.log(links);
    return { Htm: body, Json: links, Type: "img" };
  } catch (e) {
    console.log(e);
    return { error: e };
  }
}
export async function fetchCustom(obj) {
  let { url, customVal } = obj;
  try {
    let response = await fetch(url);
    let body = await response.text();
    let $ = await cheerio.load(body);
    let $qHtm = $(customVal);
    let $qTxt = $(customVal);
    let strHtm = "";
    let strTxt = "";
    $qHtm.each((index, element) => {
      strHtm += $(element).html();
    });
    $qTxt.each((index, element) => {
      strTxt += $(element).text();
    });
    return { Htm: body, queryHtm: strHtm, txt: strTxt, Type: "custom" };
  } catch (e) {
    console.log(e);
    return { error: e };
  }
}

/*
async function altFetchTable() {

 const $ = cheerio.load(html);
// Initialize an empty array to store the table data
const tableData = [];

// Iterate over each row of the table using the find and each methods
table.find('tr').each((i, row) => {
    // Initialize an empty object to store the row data
    const rowData = {};

    // Iterate over each cell of the row using the find and each methods
    $(row).find('td, th').each((j, cell) => {
        // Add the cell data to the row data object
        rowData[$(cell).text()] = j;
    });

    // Add the row data to the table data array
    tableData.push(Object.keys(rowData));
});

// Print the table data
    console.log(tableData);
    
}
 
altFetchTable();
*/
