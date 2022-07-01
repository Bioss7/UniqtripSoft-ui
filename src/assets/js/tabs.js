
if(document.querySelector(".tabs-ui__btn")) {
    const tabsBtn   = document.querySelectorAll(".tabs-ui__btn");
    const tabsItems = document.querySelectorAll(".tabs__item");

    tabsBtn.forEach(onTabClick);

    function onTabClick(item) {
        item.addEventListener("click", function() {
            let currentBtn = item;
            let tabId = currentBtn.getAttribute("data-tab");

            let currentTab = document.querySelector(tabId);

            if(!currentBtn.classList.contains('active')) {
                tabsBtn.forEach(function(item) {
                    item.classList.remove('active');
                });
        
                tabsItems.forEach(function(item) {
                    item.classList.remove('active');
                });
        
                currentBtn.classList.add('active');

                if(currentTab !== null) {
                    currentTab.classList.add('active');
                }
            }
        });
    }

    document.querySelector('.tabs-ui__btn').click();
}