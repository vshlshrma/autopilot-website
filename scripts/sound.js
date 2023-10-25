var isMuted = false;
var hoverSound = 'https://drive.google.com/uc?id=14WrkkT2B934DkjhJJDI4isvAlR8yOxIq';
    window.onload = function() {
        var anchors = document.getElementsByTagName('*');
        for(var i = 0; i < anchors.length; i++) {
            var anchor = anchors[i];
            anchor.onclick = function() {
                code = this.getAttribute('whenClicked');
                eval(code);   
            }
        }
        /*var hoverables = document.querySelectorAll('[hoverSound="true"]');
        for(var i = 0; i < hoverables.length; i++) {
            var hoverelement = hoverables[i];
            hoverelement.addEventListener('mouseenter', (event) => {
            			if(!isMuted) {
  										var audio = new Audio(hoverSound);
  										audio.play();
  								}
            });
        }*/
    }