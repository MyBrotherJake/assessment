'use strict';
//テキストボックス、ボタン、表示エリアの取得
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
//診断ボタン押下時の処理
assessmentButton.onclick = () => {
     //ユーザー名取得
     const userName = userNameInput.value;
        
     if(userName.length === 0){
         //空欄なら処理を終了
         return;
     }
     //診断結果取得
     const assessmentResult = assessment(userName);
     //診断結果の表示
     createAssessment(resultDivided, assessmentResult);
     //ツイートボタンの表示
     createAssessment(tweetDivided, assessmentResult);
}
//Enter押下でも処理を実行する
userNameInput.onkeydown = event =>{
    if(event.key === 'Enter'){
        assessmentButton.onclick();
    }
}
/**
 * 指定した要素の子要素を全て削除する
 * @param {string} element HTMLの要素
 */
function removeAllChildren(element){
   //既に診断結果がある場合
   while(element.firstChild){
    //子要素がある限り削除
    element.removeChild(element.firstChild);
   }
}
/**
 * 診断結果を表示するためのタグを追加する処理
 * @param {HTML Element} HTML要素
 * @param {String} 診断結果
 */
function createAssessment(element, result){
    //子要素の削除処理
    removeAllChildren(element);         
    //診断結果表示
    if(element === resultDivided){
        //タイトル
        const header = document.createElement('h3');
        header.innerText = '診断結果';
        //結果表示エリアに追加
        element.appendChild(header);
        //診断結果 作成
        const paragraph = document.createElement('p');
        
        paragraph.innerText = result;
        //結果表示エリアに追加
        element.appendChild(paragraph);    
    }else{
        //アンカータグ
        const anchor = document.createElement('a');
        //href の内容
        //URIエンコード
        const uriJp = encodeURI('あなたのいいところ');
        const hrefValue ='https://twitter.com/intent/tweet?button_hashtag='+ uriJp +'&ref_src=twsrc%5Etfw';
        //アンカータグ　各種設定
        anchor.setAttribute('href', hrefValue);
        anchor.className ='twitter-hashtag-button'
        //anchor.setAttribute('class', 'twitter-hashtag-button');
        anchor.setAttribute('data-text', result);
        anchor.innerText = 'Tweet #あなたのいいところ';
        //アンカータグの追加
        element.appendChild(anchor);
        //scriptタグ作成
        const script = document.createElement('script');
        //src の設定
        const src = 'https://platform.twitter.com/widgets.js';
        script.setAttribute('src', src);
        //Scriptタグの追加
        element.appendChild(script);
    }    
}
//診断結果
const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
    '{userName}のいいところは優しさです。あなたの優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**
*   名前の文字列を渡すと診断結果を返す関数
*   @param {string} userName ユーザーの名前
*   @return {string} 診断結果
*/
function assessment(userName){
    //TODO 診断処理を実装する
    //入力された全文字のコード番号を取得し、和を求める
    let sumOfCharCode = 0;
    for(let i = 0; i < userName.length; i++){
        sumOfCharCode += userName.charCodeAt(i);
    }
    //文字のコード番号の合計を回答の数で和って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    //const result = answers[index];
    let result = answers[index];
    //{userName} を入力された文字列に書き換える
    //正規表現
    result = result.replace(/\{userName\}/g, userName);
    //診断結果
    return result;
}
/* 
console.log(assessment('太郎'));
console.log(assessment('次郎'));
console.log(assessment('太郎'));
*/
/*
console.assert(
    assessment('太郎') === 
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
    );
*/
console.assert(
    assessment('太郎') === assessment('太郎'),    
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
