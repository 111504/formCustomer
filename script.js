document.addEventListener('DOMContentLoaded', function () {
    // 获取主内容区和表单容器的元素
    let mainContent = document.getElementById('main-content');
    let formContainer = document.getElementsByClassName('form-container');

    // 为所有的主菜单项设置点击事件（事件委托）
    document.querySelectorAll('.menu-item > a').forEach(function (menuItem) {
        menuItem.addEventListener('click', function (event) {
            let submenu = this.nextElementSibling;
            let arrow = this.querySelector('.arrow');

            if (submenu && submenu.classList.contains('submenu')) {
                event.preventDefault(); // 防止默认的链接跳转行为

                // 切换子菜单的显示状态
                if (submenu.style.display === 'block') {
                    submenu.style.display = 'none';
                    arrow.innerHTML = '&#9662;'; // 向下箭头
                } else {
                    submenu.style.display = 'block';
                    arrow.innerHTML = '&#9652;'; // 向上箭头
                }
            }
        });
    });

  
});
