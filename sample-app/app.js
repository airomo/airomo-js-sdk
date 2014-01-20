var totalResults = 0;
var page = 0;
var pageSize = 20;

var currentQuery = {};

airomo.setEnv({clientId:a2ClientId, apiKey:a2ApiKey});

var appTemplate =  '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 main-app-holder {{sponsored-class}}">' +
  '<div class="row app-data-row">' +
  '<div class="app-icon-holder">' +
  '<a href="{{applink}}" target="_blank">' +
  '<img onerror="hideErrorIcon(event)" src="{{icon}}" class="app-icon" />' +
  '</a>' +
  '</div>' +
  '<div class="app-data-text" style="">' +
  '<div class="app-title"><a href="{{applink}}" target="_blank">{{title}}</a></div>' +
  '<div class="app-category">{{category}}</div>' +
  '<div class="app-rating">' +
  '<span class="rating-num">{{rating}}</span>' +
  '<div class="stars-holder">' +
  '<span class="glyphicon glyphicon-star rating-star"></span>' +
  '</div>' +
  '</div>' +
  '<div class="app-data">' +
  '<span class="app-store"><i class="fa fa-{{storeicon}} store-icon"></i></span>' +
  '<button onclick="install(\'{{applink}}\')" class="btn btn-default btn-lg app-price {{free}}"><span>{{price}}</span></button>' +
  '</div> ' +
  '</div>' +
  '<div class="app-data-stats">' +
  '<div class="app-counts">' +
  '<div class="app-count-num">{{shares}}</div>' +
  '<div class="app-count-subtitle">Shares</div>' +
  '</div>' +
  '<div class="app-counts">' +
  '<div class="app-count-num">{{reviews}}</div>' +
  '<div class="app-count-subtitle">Reviews</div>' +
  '</div>' +
  '<div class="app-counts">' +
  '<div class="app-count-num">{{likes}}</div>' +
  '<div class="app-count-subtitle">Likes</div>' +
  '</div>' +
  '</div>' +
  '</div> ' +
  '<div class="row">' +
  '<div class="app-screenshot {{show_big_pic_class}}">' +
  '<img onerror="hideErrorImage(event)" src="{{screenshot}}" />' +
  '</div>' +
  '</div>' +
  '<div class="row">' +
  '<div class="app-description">' +
  '{{description}}' +
  '</div>' +
  '</div>' +
  '</div>';

var catList = ['', 'Books & Reference', 'Business', 'Education', 'Entertainment', 
  'Finance', 'Games', 'Health & Fitness', 'Lifestyle', 'Media & Video', 'Medical', 
  'Music & Audio', 'Navigation', 'News & Magazines', 'Photography', 'Productivity', 
  'Shopping', 'Social', 'Sports', 'Travel & Local', 'Utilities', 'Weather', '', 
  'Personalization'];
catList[31]='Action';catList[32]='Adventure';catList[33]='Arcade';catList[34]='Board';
catList[35]='Card';catList[36]='Casino';catList[37]='Dice';catList[38]='Educational';
catList[39]='Family';catList[40]='Kids';catList[41]='Music';catList[42]='Puzzle';catList[43]='Racing';
catList[44]='Role Playing';catList[45]='Simulation';catList[46]='Sports';catList[47]='Strategy';
catList[48]='Trivia';catList[49]='Word';catList[50]='Misc';

function hideErrorImage(event) {
  $(event.target.parentNode).addClass('show_big_pic_class');
}

function hideErrorIcon(event) {
  $(event.target).attr('src','images/dummy_app_icon.png');
}

function renderResults(results) {
  $.each(results, function(i, e) {
    var storeIcon;
    if(e.store === 1) {
      storeIcon = 'apple';
    }
    else if(e.store === 2) {
      storeIcon = 'android';
    } else if(e.store === 3) {
      storeIcon = 'amazon';
    } else if(e.store === 4) {
      storeIcon = 'nook';
    }
    e.stars = '';
    var priceAlias = 'Free';
    var free = 'btn-red';
    if(e.price !== '0.00') {
      priceAlias = '$' + e.price;
      free = '';
    }
    if(!e.social) {
      e.social = {};
    }
    e.title = /^[\000-\177]*$/.test(e.title) ? e.title : e.title.substring(0,13);
    var curApp = appTemplate
      .replace(new RegExp('{{applink}}', 'g'), e.trackingUrl)
      .replace('{{title}}', e.title.length > 30 ? e.title.substring(0,30) + '...' : e.title)
      .replace('{{icon}}', e.icon)
      .replace('{{category}}', catList[e.categories[0] || 0] + (e.categories[1] ? '/' + catList[e.categories[1]] : ''))//catList[e.categories.pop() || 0])
      .replace('{{rating}}', e.rating.toString().substring(0, 3))
      .replace('{{storeicon}}', storeIcon)
      .replace('{{price}}', priceAlias)
      .replace('{{free}}', free)
      .replace('{{shares}}', e.social.totalShares || 0)
      .replace('{{reviews}}', e.social.totalReviews || 0)
      .replace('{{likes}}', e.social.totalLikes || 0)
      .replace('{{description}}', e.description.substring(0, 200) + '...')
      .replace('{{show_big_pic_class}}', e.screenshots[0] ? '' : 'show_big_pic_class' )
      .replace('{{screenshot}}', e.screenshots[0] || '')
      .replace('{{sponsored-class}}', e.sponsored === true ? 'sponsored-class' : '');
      if(!!(i % 2)) {
        $('#right').append(curApp);
      }
      else {
        $('#left').append(curApp);
      }
      $('#single').append(curApp);
  });   
}

function doSearch(query) {
  console.log(query)
  $('#main-holder').css('min-height', (window.innerHeight - 226) + 'px');
  $('#total-apps').hide();
  $('.search-text-icon').hide();
  $('.search-button-loader').show();
  $('#more-res').hide();
  if(query === null) {
    query = $('#query-input').val();
  }
  else {
    $('#query-input').val(query);
  }
  $('#clear-search').show();
  $('#left').html('');
  $('#right').html('');
  $('#single').html('');
  
  var queryToServer = {
    size: pageSize
  };
  if(query.substring(0,7) === 'http://' || query.substring(0,8)  === 'https://') {
    queryToServer.url = query;
  }
  else {
    queryToServer.query = query;
  }
  queryToServer.ssf = true;
  currentQuery = queryToServer;
  airomo.search(queryToServer, function(err, data) {
    if(!err) {
      page = 1;
      totalResults = data.total;
      $('#total-res').html(totalResults);
      $('#total-apps').show();
      $('#main-holder').css('min-height', (window.innerHeight - 226 - 82) + 'px');
      if(totalResults>pageSize) {
        $('#more-res').show();
      }
      renderResults(data.results);
      $('.search-text-icon').show();
      $('.search-button-loader').hide();
    }
    else {
      console.log('Something went wrong...', err);
    }
  });
}

function scrollTopZ() {
  window.scrollTo(0, 0);
}

function nextPage() {
  $('.search-text-icon').hide();
  $('.search-button-loader').show();
  var nextPageQuery = currentQuery;
  nextPageQuery.size = pageSize;
  nextPageQuery.offset = pageSize*page;
  airomo.search(nextPageQuery, function(err, data) {
    if(!err) {
      page++;
      renderResults(data.results);
      if(totalResults<pageSize*page) {
        $('#more-res').hide();
      }
      $('.search-text-icon').show();
      $('.search-button-loader').hide();
    }
    else {
      console.log('Something went wrong...', err);
    }
  });
}

function install(url) {
  window.open(url);
}

function keyListener(event) {
  if(event.keyCode == 13){
    doSearch(null);
  }
  if(!$('#query-input').val()) {
    $('#clear-search').hide();
  } else {
    $('#clear-search').show();
  }
}

(function() {
  $('document').ready(function() {
    $('#clear-search').click(function() {
      $('#query-input').val('');
      $('#clear-search').hide();
      $('#query-input').focus();
    });
  });
})();