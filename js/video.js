$(document).ready(function($) {
  var $window = $(window)
  var $video = $('#video')
  var $container = $('.video-container')
  var $play = $('#play')
  var $content = $('.video-content')
  var $span = $('.video-span')

  var playerId = 0

  setSize()
  $window.resize(setSize)

  $play.on('click', function () {
    var src = $play.attr('data-video-id')
    if (!src) return
    var url = "//player.vimeo.com/video/" + src  + "?api=1&player_id=vvvvimeoVideo-"+ playerId +"&autoplay=1&badge=0&byline=0&portrait=0&title=0&loop=0&color=01806a"
    $container.removeClass('none')
    $video.attr('src', url)
    playerId++
  })

  $(this).keydown(function(e) {
    var isPlay = $video.attr('src').length
    if (e.which != 27 && isPlay) return
    $video.vimeo('pause')
    $video.attr('src', '')
    $container.addClass('none')
    $content.addClass('none')
  })

  $video
    .on('play', function(){
      console.log('play', arguments)
      $content.addClass('none')
    })
    .on('pause', function(){
      console.log('pause', arguments)
      $video.vimeo("getCurrentTime", function(data){
        $span.html(data)
      })
      $content.removeClass('none')
    })

  function setSize() {
    $video.width($window.width())
    $video.height($window.height())
  }
})
