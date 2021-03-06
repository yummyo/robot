// 组合排列查询条件 将需要的查询条件用常量的方式写到下边，然后在option中对他们进行分组

//input组件 textName为label名称
const tree_input_1 = `<input class='span12' id='tree_01_name' name="tree_01_name" type='text' placeholder="全部" textName="统计网点" title="请选择统计网点"/>`;
const tree_input_2 = `<input class='span12' id='tree_02_name' name="tree_02_name" type='text' placeholder="全部" textName="发货网点" title="请选择发货网点"/>`;
const tree_input_3 = `<input class='span12' id='tree_03_name' name="tree_03_name" type='text' placeholder="全部" textName="到货网点" title="请选择到货网点"/>`;

const select2_1 = `<select class='span12 select2' id='fdispatchOrderType' name="fdispatchOrderType" type='text' placeholder="全部" textName="运单类型" title="请选择运单类型" ></select>`;
const select2_2 = `<select class='span12 select2' id='fcodStatus' name="fcodStatus" type='text' placeholder="全部" textName="结算状态" title="请选择结算状态" ></select>`;
const select2_3 = `<select class='span12 select2' id='fbankType' name="fbankType" type='text' placeholder="全部" textName="结算银行" title="请选择结算银行" ></select>`;

const input_1 = `<input class='span12' id='fplantNo' name="fplantNo" type='text' placeholder="请输入车牌号" textName="车牌号" title="请输入车牌号"/>`;
const input_2 = `<input class='span12' id='fsenderName' name="fsenderName" type='text' placeholder="请输入收款人姓名" textName="收款人姓名" title="请输入收款人姓名"/>`;

const startDate_input = `<input type="text" class="span12 ly_date" id="fstartDate" name="fstartDate" placeholder="请输入开始时间"  textName="开始时间" title="请输入开始时间"  readonly/>`;
const endDate_input = `<input type="text" class="span12 ly_date" id="fendDate" name="fendDate" placeholder="请输入结束时间" textName="结束时间" title="请输入结束时间"  readonly/>`;

//按钮
const searchBtn = `<button class="btn btn-warning d_search " textName="&nbsp;" id="search"><i class="icon-white icon-search"></i> 查询</button>`;

//组合input模块
let option = {
    // 银行转账结算查询
    'type_1' : [tree_input_2,tree_input_3,select2_1,input_2,select2_2,select2_3,startDate_input,endDate_input]
}
class joinHeader{
    constructor(){
        this.str = '';
        //正则表达式列表
        this.rexList = {
            'id' : /id=('|")([^'|^"]+)/,
            'textName' : /textName=('|")([^'|^"]+)/
        }
    }
    init(dataArr){
        let inputList = [];
        //拼接单个input模块
        for(let key in dataArr){
            inputList.push(this.joinModule(dataArr[key]));
        }
        //拼接整个header头部
        this.joinHeader(inputList)
        return this.str;
    }
    getSearchList(data){
        //获取查询条件
        let Obj = '{';
        for(let key in data){
            let id = this.getProp(data[key],this.rexList['id']);
            switch (id) {
                default:
                    Obj += `'${id}':$(${id}).val(),`;
                    break;
            }
        }
        Obj+="}";
        return Obj
    }
    getProp(string,rex){
        //获得字符串中的属性
        let _prop = string.match(rex);
        return _prop[_prop.length-1]
    }
    joinModule(input_str){
        //拼接一个查询条件
        return `
            <div class='span3'>
                <label class='control-label' for="${this.getProp(input_str,this.rexList['id'])}">${this.getProp(input_str,this.rexList['textName'])}</label>
                <div class=''>
                    ${input_str}
                </div>
            </div>
        `;
    }
    joinHeader(dataArr){
        let num = 4;
        for(let key of dataArr){
            if(num%4 == 0){
                this.str += `<div class='row-fluid'>`;
            }
            this.str += key;
            if(num%4 == 3){
                this.str += `</div>`;
            }
            num++;
        }
    }
}

//num 选择的查询input组合
//type 选择返回html还是查询条件
function getHeader(num,type){
    if(!type){
        let _html = "";
        if(num){
            _html = new joinHeader().init(option['type_'+num])
        }
        return _html;
    }else{
        return new joinHeader().getSearchList(option['type_'+num]);
    }
   
};
module.exports = getHeader;