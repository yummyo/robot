// search_type 查询条件
// pageName 页面名称
// listName table列名称
let option = {
    "search_type" : 3,
    "pageName" : "test",
    'pageTitle' : "合同户客户",
    'listName' : ['ID','日期','运单合计','件数合计','提付','交付','合同户','保值费合计','运费总合计','转接费合计'],
    'listKeyName' : ['i+1','fdispatchOrderNo','fsenderName','fsenderMobile','freceiverName','fsendDate','floadDate','fsendSiteName','freceiveSiteName','fgoodsName'],
    'msgid' : "1001004268",
}
module.exports = option;