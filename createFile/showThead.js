//data 数组 数组格式 拼接要显示的table列表
// type 拼接列表显示文字 还是内容
function setTheadHtml(data,type){
    let Obj = '';
    if(type){
        // 拼接value
        Obj += "`<tr>\n";
        if(data.length>0){
            data.forEach((v,k) => {
                if(k == 0){
                    Obj += '<th>${'+v+'}</th>\n';
                }else{
                    Obj += '<th>${v.'+v+'}</th>\n';
                }
            });
        }
        Obj += "</tr>`\n";
        return Obj;
    }else{
        // 拼接名称
        Obj += '<tr>\n';
        if(data.length>0){
            data.forEach((v,k) => {
                switch (v) {
                    case '交付':
                    Obj += `<th><span class="fpayName1">交付</span>合计</th>\n`;
                        break;
                    case '提付':
                    Obj += `<th><span class="fpayName2">提付</span>合计</th>\n`;
                        break;
                    case '合同户':
                    Obj += `<th><span class="fpayName3">合同户</span>合计</th>\n`;
                        break;
                    default:
                    Obj += `<th>${v}</th>\n`;
                        break;
                }
            });
        }
        Obj += '</tr>\n';
        return Obj;
    }
}
module.exports = setTheadHtml;