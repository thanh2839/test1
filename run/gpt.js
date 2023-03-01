const hotenValue = sessionStorage.getItem('hotenValue');
const benhValue = sessionStorage.getItem('benhValue');

const p1 = document.querySelector('p1');
const oldText = p1.innerHTML;
const newText = oldText.replace('Hovaten', hotenValue);
const newText1 = newText.replace('benhcuakhach', benhValue);
p1.innerHTML = newText1;

const p3 = document.querySelector('p3');
const oldText3 = p3.innerHTML;
const newText3 = oldText3.replace('benhcuakhach', benhValue);
p3.innerHTML = newText3;

const ph4 = document.querySelector('ph4');
const oldText4 = ph4.innerHTML;
const newText4 = oldText4.replace('benhcuakhach', benhValue);
ph4.innerHTML = newText4;

const p2 = document.querySelector('p2');
bệnh lý, triệu chưng, và dị ứng,
// request
const prompt = "Xây dựng thực đơn dinh dưỡng cụ thể 3 bữa trong 7 ngày từ thứ Hai đến Chủ Nhật cho người bị bệnh " + benhValue ;
const prompt1="Thực phẩm chức năng cho bệnh " + benhValue;
const prompt2 = "Lời khuyên của chuyên gia về chế độ sinh hoạt tập luyện cho bệnh " + benhValue;
const maxTokens = 2048;
//const maxTokens = 4000;
const engine = "text-davinci-003";
//const engine ="code-davinci-002";
// api key
const apiKey = "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";
// câu hỏi về 7 ngày
//const outputDivx = document.getElementById("outputx");
//outputDivx.innerHTML = prompt;
const outputDivt1 = document.getElementById("output monday");
const outputDivt2 = document.getElementById("output tuesday");
const outputDivt3 = document.getElementById("output wednesday");
const outputDivt4 = document.getElementById("output thursday");
const outputDivt5 = document.getElementById("output friday");
const outputDivt6 = document.getElementById("output saturday");
const outputDivt7 = document.getElementById("output sunday");
const outputDivt8 = document.getElementById("output xxx");
// 2 câu hỏi sau
const outputDiv1 = document.getElementById("output1");
const outputDiv2 = document.getElementById("output2")
const loadingDiv = document.getElementById("loading");
const loadingDiv1 = document.getElementById("loading1");
const loadingDiv2 = document.getElementById("loading2");

const promt1 = document.getElementById("prompt")

loadingDiv.style.display = "block";

//prompt

//Day:
//Ten ngay
//Bua sang: asdasdsdad
//Bua trua: sadasdads
//Bua toi: asdasda
class Day{
    constructor(day){
        this.day = day;
        this.str = ""
    }
}
const Days=[]
function splitDay(arr){
    let n = arr.length
    for(let i = 1; i < n; i++){
        let element = arr[i]
        if(element.includes("Thứ") || element.includes("Chủ Nhật")){
            Days.push(new Day(element.substring(4,element.length)))
        }
        else{
            let day = Days.pop()
            day.str+="<span class=\"dish\">"+element+"</span><br>"
            Days.push(day)
        }
    }
}
//
axios.post('https://api.openai.com/v1/engines/'+ engine + '/completions', {
    prompt: prompt,
    max_tokens: maxTokens,
    temperature: 0.7,
    n: 1,
    stop: null,
    }, {
    headers: { Authorization: `Bearer ${apiKey}` }
    })
    .then((response) => {
        console.log(response);
        const answer = response.data.choices[0].text;
        //const list = answer.spit(/\n\n/g);
        const answerx = answer.replace(/\n\n/g,"//" ).replace(/\n/g,"//");
        // const list = answer.split(/(\d+:)/).filter(token => token.trim());
        // const json = JSON.stringify(response.data.choices[0]);
        
        // outputDiv.innerHTML = json;
        const list = answerx.split("//");
        splitDay(list)

        outputDivt1.innerHTML = Days[0].str
        outputDivt2.innerHTML = Days[1].str
        outputDivt3.innerHTML = Days[2].str
        outputDivt4.innerHTML = Days[3].str
        outputDivt5.innerHTML = Days[4].str
        outputDivt6.innerHTML = Days[5].str
        outputDivt7.innerHTML = Days[6].str
        
        loadingDiv.style.display = "none";
    })
//prompt1
axios.post('https://api.openai.com/v1/engines/'+ engine + '/completions', {
    prompt: prompt1,
    max_tokens: maxTokens,
    temperature: 0.7,
    n: 1,
    stop: null,
        }
    , {
    headers: { Authorization: `Bearer ${apiKey}` }
        })
    .then((response) => {
        //console.log(response);
        const answer1 = response.data.choices[0].text;
        
        //const normalizedAnswer1 = answer.split('-').join('\n-').split('Thứ').join('\nThứ');
        //const traloi = answer1.replace("\n","<br>");
        //const chuanhoa = answer1.replace("/\n\n\d+/g","<br>")
        outputDiv1.innerHTML = "<p>" + answer1.replace(/\n/g,"<br>") + "</p>";
        //outputDiv1.innerHTML = "<p>" + chuanhoa + "</p>";
        loadingDiv1.style.display = "none";
        })
    //prompt2 
axios.post('https://api.openai.com/v1/engines/'+ engine + '/completions', {
        prompt: prompt2,
        max_tokens: maxTokens,
        temperature: 0.7,
        n: 1,
        stop: null,
        }, {
        headers: { Authorization: `Bearer ${apiKey}` }
        })
        .then((response) => {
            const answer3 = response.data.choices[0].text.replace(/\n/g,"<br>");
            //const normalizedAnswer = answer.split('-').join('\n-').split('Thứ').join('\nThứ');
            outputDiv2.innerHTML = "<p>" + answer3 + "</p>";
            loadingDiv2.style.display = "none";
    })
    .catch((error) => {
    console.log(error);
    loadingDiv.style.display = "none";
    });