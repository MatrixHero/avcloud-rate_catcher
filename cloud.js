var AV = require('leanengine');

/**
 * 一个简单的云代码方法
 */
AV.Cloud.define('hello', function(request, response) {
  response.success('Hello world!');
});

AV.Cloud.define('refresh', function(request, response) {
 AV.Cloud.httpRequest({
  url: 'http://soufunapp.3g.fang.com/http/sf2014.jsp?messagename=getLoanRate&wirelesscode=0E629C4012270E0901C714182E172116',
  success: function(httpResponse) {
    var parser = require('xml2json');
    var json = parser.toJson(httpResponse.text);
    var r = JSON.parse(json);
    var array = r.root.item;
    // 创建AV.Object子类.
        // 该语句应该只声明一次
    var Rate = AV.Object.extend("Rate");
    var query = new AV.Query(Rate);
    query.destroyAll({
      success: function(){
        // 成功删除 query 命中的所有实例.
      for (var i = 0; i < array.length; ++i) {
        var item = array[i];
        // 创建该类的一个实例
        var rate = new Rate();
        rate.set("identifer",item['id']);
        rate.set("calculatename",item.calculatename);
        rate.set("commercefirst",item.commercefirst);
        rate.set("commercesecond",item.commercesecond);
        rate.set("commerceone",item.commerceone);
        rate.set("commerceten",item.commerceten);
        rate.set("fundone",item.fundone);
        rate.set("fundten",item.fundten);
        rate.set("isshow",item.isshow);
        rate.set("defaultshow",item.defaultshow);
        rate.set("sort",item.sort);
        rate.set("addtime",item.addtime);
        rate.set("updatetime",item.updatetime);
        rate.save(null, {
            success: function(post) {
                
              },
            error: function(post, error) {
          }
        });
      }

      },
      error: function(err){
      // 失败了.
      }
   });
    response.success('ok');
  },
  error: function(httpResponse) {
    console.error('Request failed with response code ' + httpResponse.status);
  }
});
});

module.exports = AV.Cloud;
