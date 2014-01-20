function mobileDetect() {
  var mobileOS;
  var agent = navigator.userAgent.toLowerCase();
  if (agent.match(/ipad/i) || agent.match(/iphone/i)) {
    mobileOS = 'ios';
  }
  else if (agent.match(/android/i)) {
    mobileOS = 'android';
  }
  else {
    mobileOS = 'unknown';
  }
  return mobileOS;
}

airomo.setEnv({clientId:1132368938, apiKey:'bnu2ck7gtuh9xyiwr563ithxnfi72i05'});

(function() {
  var mob = mobileDetect();
  var appTemplate = '<li>' +
    '<div class="overlay"> <a href="{{app_url}}"><img style="width:70px;height:70px;" src="{{app_icon}}" alt="" />' +
    '<div></div>' +
    '</a> </div>' +
    '<div class="meta">' +
    '<h6><a href="{{app_url}}">{{app_title}}</a></h6>' +
    '<em>{{app_descr}}</em> </div>' +
    '</li>';
  var query = {query:'porsche', size: 4};
  if(mob === 'ios') {
    query.store = 1;
  }
  else if(mob === 'android') {
    query.store = 2;
  }
  airomo.search(query, function(err, data) {
    if(!err) {
      $('#porsche-apps').html('');
      $.each(data.results, function(i, e) {
        var tpl = appTemplate;
        $('#porsche-apps').append(
          tpl.replace('{{app_icon}}', e.icon)
             .replace('{{app_title}}', e.title)
             .replace('{{app_descr}}', e.description.substring(0, 30) + '...')
             .replace(new RegExp('{{app_url}}', 'g'), 'http://www.airomo.net/apps/' + e.id)
        );
      });
    }
    else {
      console.log(err);
    }
  });
})();

function doSearch() {
  var platform = '';
  var mob = mobileDetect();
  if(mob === 'ios') {
    platform = '&stores=1';
  }
  else if(mob === 'android') {
    platform = '&stores=1';
  }
  var keywords = ' classic cars';
  var url = 'http://www.appcurl.com/?q=' + encodeURIComponent($('#s2').val() + keywords) + platform;
  window.open(url);
  return false;
}