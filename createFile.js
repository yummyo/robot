const fs = require('fs'),
      getHeader = require('./createFile/input_Opt.js'),
      //配置文件
      PageOption = require('./createFile/pageOption.js'),
      showThead = require('./createFile/showThead.js'),
       // 模板路径
        readPath = 'createFile/',
       //html存放路径
        // writePath_html = `createFile/webapp/tpl/${PageOption.pageName}.html`,
        writePath_html = function(){
            if(process.argv[2] && process.argv[2].indexOf('.html') > -1){
                return process.argv[2]
            }else{
                return PageOption.pageName+".html"
            }
        },
       //html存放路径
        // writePath_js = `createFile/webapp/assets/javascripts/api/${PageOption.pageName}.js` ;
        writePath_js =  function(){
            if(process.argv[2] && process.argv[2].indexOf('.js') > -1){
                return process.argv[3];
            }else{
                return PageOption.pageName+".html";
            }
        }

    //   createHtml();
    //   createJs();



function createHtml(){
    let searchHtml = getHeader(PageOption['search_type']),
   
    //正则替换列表 JSON 格式
    regList = {
        'searchHeader':{
            'reg':'searchCondition',
            'data': searchHtml
        },
        'pageName':{
            'reg':'pageName',
            'data': PageOption.pageName
        },
        'theadHtml':{
            'reg':'theadHtml',
            'data': showThead(PageOption.listName)
        },
    },
    option = {
        encoding:'utf-8'
    },
    // 读取模板内容
    _File = fs.readFile(readPath+"template.html",option,(err,data) => {
        if(err) throw err;
        // 替换
        let _html = REG_data(data,regList);
        // 写入
        fs.writeFile(writePath_html, _html,function(err){
            if(err) console.log('html生成失败');
            else console.log('html生成成功');
        });
    });
}
function createJs(){
    
    let ConditionList = `eval(${getHeader(PageOption['search_type'],true)})`;
    let regList = {
            'pageTitle':{
                'reg':'pageTitle',
                'data':  PageOption.pageTitle
            },
            'msgid':{
                'reg':'msgid',
                'data': PageOption.msgid
            },
            'pageName':{
                'reg':'pageName',
                'data': PageOption.pageName
            },
            'ConditionList':{
                'reg':'ConditionList',
                'data': ConditionList
            },
            'listKeyName':{
                'reg':'listKeyName',
                'data': showThead(PageOption.listKeyName,true)
            },
        },
        option = {
            encoding:'utf-8'
        },
        _File = fs.readFile(readPath+"template.js",option,(err,data) => {
            if(err) throw err;
            fs.writeFile(writePath_js, REG_data(data,regList),function(err){
                if(err) console.log('js生成失败');
                else console.log('js生成成功');
            });
        });
}
//正则通用替换
function REG_data(_data,regList){
    for(let key in regList){
        let RE = new RegExp(`(\s*)\&\&${regList[key]['reg']}\&\&`,'g');
        _data = _data.replace(RE,"$1"+regList[key]['data'])
    }
    return _data
}