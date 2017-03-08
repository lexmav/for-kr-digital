!(function() {

   var modal = {
         order: document.querySelector('.modal.modalOrder'),
         reg: document.querySelector('.modal.modalReg'),
         log: document.querySelector('.modal.modalLog')
      },
      forms = {
         log: modal.log.querySelector('form'),
         reg: modal.reg.querySelector('form'),
         order: modal.order.querySelector('form')
      },
      clicable = {
         log: document.querySelector('a.login'),
         reg: document.querySelector('a.reg'),
         auction: document.querySelectorAll('.auctBlock')
      },
      userPass = modal.reg.querySelector('.userPass'),
      strip = modal.reg.querySelector('.strip'),
      passText = modal.reg.querySelector('.passText'),
      sliderCont = document.querySelector('.sliderCont');

   window.addEventListener('click', function(e) {
      if (e.target.className.match(/modalClose/)) {
         var activeModal = document.querySelector('.modal.active');
         if (activeModal) activeModal.classList.remove('active');
      }
   });

   clicable.log.onclick = function(e) {
      e.preventDefault();
      modal.log.classList.add('active');

   }
   clicable.reg.onclick = function(e) {
      e.preventDefault();
      modal.reg.classList.add('active');

   }

   forms.log.onsubmit = function() {
      if (!checker(forms.log)) return false;
   }
   forms.reg.onsubmit = function() {
      if (!checker(forms.reg)) return false;
   }
   forms.order.onsubmit = function() {
      if (!checker(forms.order)) return false;
   }

   userPass.onkeypress = userPass.onkeyup = function() {
      if (this.value.length > 10) return;
      var len = this.value.length;
      for (var i = 0; i < 10; i++) {
         if (i < len) {
            strip.children[i].classList.add('active');
         } else {
            strip.children[i].classList.remove('active');
         }
      }
      if (!len) {
         passText.innerText = 'Введите пароль';
      } else if (len > 0 && len <= 3) {
         passText.innerText = 'Не надёжный пароль';
         strip.className = 'strip';
      } else if (len > 3 && len <= 7) {
         strip.className = 'strip level2';
         passText.innerText = 'средний пароль';
      } else if (len > 7) {
         strip.className = 'strip level3';
         passText.innerText = 'хороший пароль';
      }
   }


   for (var i = 0; i < clicable.auction.length; i++) {
      var elem = clicable.auction[i];
      elem.onclick = auctionClick;
   }

   function auctionClick() {
      modal.order.classList.add('active');
   }

   function checker(form) {
      var values = form.querySelectorAll('.req');

      for (var i = 0; i < values.length; i++) {
         var inp = values[i];
         if (!inp.value) {
            alert('Не все поля заполнены!');
            inp.focus();
            return false;
         }
      }
      return true;
   }

   function slider() {
      var interval, status = 1,
         leftBut = document.querySelector('.slider').querySelector('.toLeft'),
         rightBut = document.querySelector('.slider').querySelector('.toRight');

      var startSlides = sliderCont.querySelectorAll('.block');
      for (var i = 0, width = 0; i < startSlides.length; i++) {
         startSlides[i].style.position = 'absolute';
         startSlides[i].style.left = width + '%';
         width += 25;
      }

      slider.stop = function() {
         clearInterval(interval);
      }

      slider.start = function() {
         interval = setInterval(function() {
            slider.left();
         }, 2000)
      }

      slider.left = function() {
         if (!status) return;
         var slides = sliderCont.querySelectorAll('.block'),
            newSlide = slides[0].cloneNode(true);
         newSlide.style.left = '100%';
         sliderCont.appendChild(newSlide);
         slides = sliderCont.querySelectorAll('.block');
         setTimeout(function() {
            for (var i = 0, width = -25; i < slides.length; i++) {
               slides[i].style.left = width + '%';
               width += 25;
            }
            status = 0;
            slides[0].addEventListener('transitionend', function() {
               slides[0].parentElement.removeChild(slides[0]);
               status = 1;
            })
         });
      }
      slider.right = function() {
         if (!status) return;
         var slides = sliderCont.querySelectorAll('.block'),
            newSlide = slides[slides.length - 1].cloneNode(true);
         newSlide.style.left = '-25%';
         sliderCont.insertBefore(newSlide, sliderCont.firstChild);
         slides = sliderCont.querySelectorAll('.block');
         setTimeout(function() {
            for (var i = 0, width = 0; i < slides.length; i++) {
               slides[i].style.left = width + '%';
               width += 25;
            }
            status = 0;
            var lastElem = slides[slides.length - 1];
            lastElem.addEventListener('transitionend', function() {
               lastElem.parentElement.removeChild(lastElem);
               status = 1;
            })
         });
      }

      sliderCont.onmouseenter =
         leftBut.onmouseenter =
         rightBut.onmouseenter = slider.stop;

      sliderCont.onmouseleave =
         leftBut.onmouseleave =
         rightBut.onmouseleave = slider.start;

      leftBut.onclick = slider.left;
      rightBut.onclick = slider.right;
   }
   slider();
   slider.start();
})();;
