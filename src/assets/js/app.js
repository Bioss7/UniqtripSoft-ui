const hasSubnav = document.querySelectorAll('.nav-menu__link.has-subnav');
const hasBody = document.body;

hasSubnav.forEach(item => item.addEventListener('click', event => {
    if(hasBody.classList.contains('show-sidebar')){
        let $this = event.currentTarget;
        let subnavMenu = $this.nextElementSibling;
        // $this.classList.toggle('open');

        if(!$this.classList.contains('open')){
            $this.classList.add('open')
            setTimeout(() => {
                subnavMenu.style.height = 'auto';
                subnavMenu.style.opacity = '1';
                subnavMenu.style.transform = 'none';
            }, 1);
        } else {
            subnavMenu.removeAttribute('style');
            setTimeout(() => {
                $this.classList.remove('open');
            }, 1);
        }

        
        
       
    }
}));