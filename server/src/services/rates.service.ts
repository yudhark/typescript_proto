import axios from "axios";
import { TypeOf } from "zod";

export const get_rates = async () => {
  const rates = await axios.get(
    "https://www.bi.go.id/en/statistik/informasi-kurs/transaksi-bi/Default.aspx"
  );
  return rates;
};

interface FlattenObject {
  headers: Array<string>;
  body: Array<Array<any>>;
}

export const flatten_html = (data: string): FlattenObject => {
  var table = data.substring(
    data.lastIndexOf("<table"),
    data.lastIndexOf("</table>") + 8
  );
  var thead = table.substring(
    table.lastIndexOf("<thead"),
    table.lastIndexOf("</thead>") + 8
  );

  var tbody = table.substring(
    table.lastIndexOf("<tbody"),
    table.lastIndexOf("</tbody>") + 8
  );

  thead = thead
    .replace(/\r\n/g, "")
    .replace(/\s+/g, " ")
    .replace(/> </g, ">\n<");

  tbody = tbody
    .replace(/\r\n/g, "")
    .replace(/\s+/g, " ")
    .replace("<tbody>", "")
    .replace("</tbody>", "")
    .replace(/<\/tr> <tr/g, "</tr>\n<tr")
    .trim();

  const thead_chars = thead.split("\n");
  const tbody_chars = tbody.split("\n");
  thead_chars.splice(0, 2);
  thead_chars.splice(thead_chars.length - 3, 3);
  const headers = thead_chars.map((item) => {
    return item
      .substring(item.lastIndexOf('">') + 3, item.lastIndexOf("</th>"))
      .trim();
  });

  const body = tbody_chars.map((item) =>
    item
      .replace("<tr>", "")
      .replace("</tr>", "")
      .trim()
      .replace(/<\/td> <td/g, "</td>\n<td")
      .split("\n")
      .slice(0, -1)
      .map((chars) =>
        chars
          .substring(chars.lastIndexOf('">') + 2, chars.lastIndexOf("</td>"))
          .trim()
      )
  );
  return { headers, body };
};

export const build_data = (headers: Array<string>, body: Array<Array<any>>) => {
  const returned_data: any[] = [];
  for (let i = 0; i < body.length; i++) {
    returned_data.push({
      [headers[0]]: body[i][0],
      [headers[1]]: parseInt(body[i][1]),
      [headers[2]]: parseFloat((body[i][2]).replace(/,/g,"")),
      [headers[3]]: parseFloat((body[i][3]).replace(/,/g,""))
    });
  }

  return returned_data;
};
