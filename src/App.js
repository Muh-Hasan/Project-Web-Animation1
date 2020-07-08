import React, { useLayoutEffect, useRef } from 'react';
import './App.css';
import car from './car.svg'
import guide from './guide.svg'
import street from './street.svg'
import light from './street-light.svg'

function App() {

  var background1 = useRef(null)
  var background2 = useRef(null)

  var foreground1 = useRef(null);

  var car_runing = useRef(null);
  useLayoutEffect(() => {
    var sceneryFrames = [
      { transform: 'translateX(100%)' },
      { transform: 'translateX(-100%)' }
    ];

    var sceneryTimingBackground = {
      duration: 36000,
      iterations: Infinity,
    };

    var sceneryTimingForeground = {
      duration: 12000,
      iterations: Infinity
    };

    var background1Movement = background1.current.animate(sceneryFrames, sceneryTimingBackground);
    // background1Movement.currentTime = background1Movement.effect.timing.duration / 2;

    var background2Movement = background2.current.animate(sceneryFrames, sceneryTimingBackground);

    var foreground1Movement = foreground1.current.animate(sceneryFrames, sceneryTimingForeground);
    // foreground1Movement.currentTime = foreground1Movement.effect.timing.duration / 2;

    var spriteFrames = [
      { transform: 'translateY(0)' },
      { transform: 'translateY(0)' }
    ];

    var car_playback = car_runing.current.animate(
      spriteFrames, {
      // easing: 'steps(7, end)',
      direction: "reverse",
      duration: 600,
      playbackRate: 1,
      iterations: Infinity
    });
    var sceneries = [foreground1Movement,background1Movement, background2Movement];


    var adjustBackgroundPlayback = function () {
      if (car_playback.playbackRate < .8) {
        sceneries.forEach(function (anim) {
          anim.playbackRate = car_playback.playbackRate / 2 * -1;
        });
      } else if (car_playback.playbackRate > 1.2) {
        sceneries.forEach(function (anim) {
          anim.playbackRate = car_playback.playbackRate / 2;
        });
      } else {
        sceneries.forEach(function (anim) {
          anim.playbackRate = 0;
        });
      }
    }
    adjustBackgroundPlayback();

    setInterval(function () {
      /* Set decay */
      if (car_playback.playbackRate > .4) {
        car_playback.playbackRate *= .9;
      }
      adjustBackgroundPlayback();
    }, 3000);

    var goFaster = function () {
      /* But you can speed them up by giving the screen a click or a tap. */
      car_playback.playbackRate *= 1.1;
      adjustBackgroundPlayback();
    }

    document.addEventListener("click", goFaster);
    document.addEventListener("touchstart", goFaster);

  }, [])

  return (
    <div>
      <div className="sky"></div>
      <div className="floor">
        <div className="car_run">
          <img className="car_runing" ref={car_runing} src={car} alt="Alice and the Red Queen running to stay in place." />
        </div>
      </div>

      <div className="scenery foreground1" ref={foreground1}>
        <img className="light" src={light} alt=" " />        
      </div>
      <div className="scenery background1" ref={background1}>
        <img className="street" src={street} alt=" " />
        <img className="guide" src={guide} alt=" " />
      </div>
      <div className="scenery background2" ref={background2}>
      <img className="street" src={street} alt=" " />
        <img className="guide" src={guide} alt=" " />
        </div>
    </div>
  );
}

export default App;
