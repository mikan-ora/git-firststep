"use strcit";

const axios = require("axios");
const fs = require("fs"); //注: npm i 不要

//データ更新関数
async function updateData(newData) {
  const PATH = "./docs/data.json";
  fs.writeFileSync(PATH, JSON.stringify(newData));
}

// 実際にデータを取得する getRequest 関数
async function getRequest() {
  let response;
  try {
    response = await axios.get(
        "https://donation.yahoo.co.jp/search?query=%E3%82%B3%E3%83%AD%E3%83%8A%E3%82%A6%E3%82%A4%E3%83%AB%E3%82%B9"
    );
    // console.log(response.data);
    let html = response.data;
    html = html.replace(/\r?\n/g, ""); //整形1: 改行などを削除して整形しやすくする

    //運行情報
    let unko = html.match(/id="result"(.*?)<\/section>/)[1];
    unko = unko.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ""); //整形2: タグを削除
    unko = unko.match(/寄付総額(.*?)円/g)
    console.log(unko);

    //時間
    //let jikan = html.match(/class="subText">(.*?)<\/span>/)[1];
    //jikan = jikan.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ""); //整形2: タグを削除
    //console.log(jikan);

    //const saveData = {
    //  date: jikan,
    //  msg: unko,
    //};

    //await updateData(saveData); //データ更新関数を実行
  } catch (error) {
    console.error(error);
  }
}

// getRequest を呼び出してデータを読み込む
getRequest();