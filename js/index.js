var in_id = localStorage.getItem('in_id')
var elev_id = localStorage.getItem('elev_id')

if(!in_id || !elev_id) {
  $('.login-btn').click(function() {
    var in_val = $('#in_val').val()
    var elev_val = $('#elev_val').val()

    if(in_val === 'undefined' || elev_val === 'undefined' || in_val === '' || elev_val === '') {
      alert('请填写设备编号！')
    } else {
      window.localStorage.setItem('in_id', in_val)
      window.localStorage.setItem('elev_id', elev_val)
      $('.login-wrapper').hide(500)

      $('#video source').attr('autoplay', 'autoplay')

      in_id = localStorage.getItem('in_id')
      elev_id = localStorage.getItem('elev_id')
      getInAqi(in_id)
      getElevAqi(elev_id)
    }
  })
} else {
  $('.login-wrapper').hide()
  $('#video source').attr('autoplay', 'autoplay')
  getInAqi(in_id)
  getElevAqi(elev_id)
}

function getOutAqi () {
  $.ajax({
    url: 'http://aliv8.data.moji.com/whapi/json/aliweather/aqi?lat=31.202777&lon=121.486655&token=6e9a127c311094245fc1b2aa6d0a54fd',
    type: 'POST',
    dataType: 'json',
    headers: {
      "Authorization": "APPCODE 4d283daf5f35494ca99e0854f9974952",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Accept": "application/json",
      "X-Ca-Request-Mode": "debug",
      "X-Ca-Key": "25644678" 
    },
    success: function(res){
      console.log(res);
      var AQI = res.data.aqi.value
      $('.out-pm').html(AQI);
      $('#outPmC').html(Math.round(Number(res.data.aqi.pm25C)));
      
      if(AQI >= 0 && AQI <= 50) {
        $('#out-status').addClass('status-lv1')
      } else if(AQI > 50 && AQI <= 100) {
        $('#out-status').addClass('status-lv2')
      } else if(AQI > 100 && AQI <= 150) {
        $('#out-status').addClass('status-lv3')
      } else if(AQI > 150 && AQI <= 200) {
        $('#out-status').addClass('status-lv4')
      } else if(AQI > 200 && AQI <= 300) {
        $('#out-status').addClass('status-lv5')
      } else if(AQI > 300) {
        $('#out-status').addClass('status-lv6')
      }
    }
  })
}

function getCondition () {
  $.ajax({
    url: 'http://aliv8.data.moji.com/whapi/json/aliweather/condition?lat=31.202777&lon=121.486655&token=ff826c205f8f4a59701e64e9e64e01c4',
    type: 'POST',
    dataType: 'json',
    headers: {
      "Authorization": "APPCODE 4d283daf5f35494ca99e0854f9974952",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Accept": "application/json",
      "X-Ca-Request-Mode": "debug",
      "X-Ca-Key": "25644678" 
    },
    success: function(res){
      console.log(res);
      var temp = res.data.condition.temp
      $('#outTemp').html(temp);
      $('#outFah').html(Math.round(32 + Number(temp)*1.8));
      $('#outHud').html(res.data.condition.humidity);
    }
  })
}

function getInAqi (id) {
  $.ajax({
    url: 'http://101.200.32.171:5002/api/sensors/single_sensor?s_index=' + id,
    type: 'GET',
    dataType: 'json',
    success: function(res){
      console.log('室内：', res);
      var AQI = res.aqi;
      if(AQI == 0 || AQI == '-') {
        AQI = 25
      }
      $('#inTemp').html(Math.round(res.temperature))
      $('#inFah').html(Math.round(res.temperature * 1.8 + 32))
      $('#inHud').html(Math.round(res.humidity))
      $('#inCo2').html(Math.round(res.co2))
      $('#inTvoc').html(Math.round(res.tvoc))
      $('#in-status').html(AQI)

      if(AQI >= 0 && AQI <= 50) {
        $('#in-status').addClass('status-lv1')
      } else if(AQI > 50 && AQI <= 100) {
        $('#in-status').addClass('status-lv2')
      } else if(AQI > 100 && AQI <= 150) {
        $('#in-status').addClass('status-lv3')
      } else if(AQI > 150 && AQI <= 200) {
        $('#in-status').addClass('status-lv4')
      } else if(AQI > 200 && AQI <= 300) {
        $('#in-status').addClass('status-lv5')
      } else if(AQI > 300) {
        $('#in-status').addClass('status-lv6')
      }
    }
  })
}

function getElevAqi (id) {
  $.ajax({
    url: 'http://101.200.32.171:5002/api/sensors/single_sensor?s_index=' + id,
    type: 'GET',
    dataType: 'json',
    success: function(res){
      console.log('电梯厅：', res);
      var AQI = res.aqi;
      if(AQI == 0) {
        AQI = 25
      }
      $('#elevTemp').html(Math.round(res.temperature))
      $('#elevFah').html(Math.round(res.temperature * 1.8 + 32))
      $('#elevHud').html(Math.round(res.humidity))
      $('#elevCo2').html(Math.round(res.co2))
      $('#elevTvoc').html(Math.round(res.tvoc))
      $('#elev-status').html(AQI)

      if(AQI >= 0 && AQI <= 50) {
        $('#elev-status').addClass('status-lv1')
      } else if(AQI > 50 && AQI <= 100) {
        $('#elev-status').addClass('status-lv2')
      } else if(AQI > 100 && AQI <= 150) {
        $('#elev-status').addClass('status-lv3')
      } else if(AQI > 150 && AQI <= 200) {
        $('#elev-status').addClass('status-lv4')
      } else if(AQI > 200 && AQI <= 300) {
        $('#elev-status').addClass('status-lv5')
      } else if(AQI > 300) {
        $('#elev-status').addClass('status-lv6')
      }
    }
  })
}

function formatDate() {
  var date = new Date()
  var yy = date.getFullYear()
  var mm = date.getMonth() + 1
  var dd = date.getDate()
  var h = date.getHours()
  var min = date.getMinutes()
  var w = date.getDay()
  var week
  switch(w) {
    case 0:
     week = '星期日'
     break;
    case 1:
     week = '星期一'
     break;
    case 2:
     week = '星期二'
     break;
    case 3:
     week = '星期三'
     break;
    case 4:
     week = '星期四'
     break;
    case 5:
     week = '星期五'
     break;
    case 6:
     week = '星期六'
     break;
  }
  var date_cn = yy + '-' + mm + '-' + dd + ' ' + h + ':' + min + ' ' + week
  var date_en = date.toString().substring(0, date.toString().lastIndexOf(':'))
  $('.date-cn').html(date_cn);
  $('.date-en').html(date_en);
}

getOutAqi();
getCondition();
formatDate();

var timer;
clearInterval(timer)

timer = setInterval(function() {
  getInAqi(in_id)
  getElevAqi(elev_id)
  getOutAqi()
  getCondition()
  formatDate()
}, 60000)