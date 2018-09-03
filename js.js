function Container(id, className) {
    this.id = id;
    this.class = className;
}

Container.prototype.render = function () {
    var div = document.createElement('div');

    div.className = this.className;
    div.id = this.id;

    return div;
}

Container.prototype.remove = function () {
    var node = document.getElementById(this.id);

    node.parentElement.removeChild(node);
}

function Menu(id, className, items) {
    Container.call(this, id, className);

    this.items = items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.render = function () {
    var menu = document.createElement(this.tagName);
    menu.className = this.className;
    menu.id = this.id;

    this.items.forEach(function(item) {
        if(item instanceof Container) {
            menu.appendChild(item.render());
        }
    });

    return menu;
}

function MenuItem(href, title) {
    Container.call(this);

    this.tagName = 'li';
    this.className = 'menu-item';
    this.href = href;
    this.title = title;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.render = function () {
    var li = document.createElement('li');
    var a = document.createElement('a');

    a.href = this.href;
    a.textContent = this.title;

    li.appendChild(a);
    li.className = this.class;

    return li;
}

function SuperMenu(className, id, items, title, href) {
    Menu.call(this, className, id, items);
    this.title = title;
    this.href = href;
}

SuperMenu.prototype = Object.create(Menu.prototype);

SuperMenu.prototype.render = function () {
    if (this.title && this.href) {
        var menuItem = new MenuItem(this.title, this.href).render();
        menuItem.appendChild(Menu.prototype.render.call(this));

        return MenuItem;
    } else {
        return Menu.prototype.render.call(this);
    }
}

window.onload = function () {
    var items = [
                new MenuItem('https://geekbrains.ru', 'menu'),
                new MenuItem('https://geekbrains.ru', 'news'),
                new MenuItem('https://geekbrains.ru', 'contacts'),
                new SuperMenu('ChildMenu', 'ChildMenu', [
                    new MenuItem('https://geekbrains.ru', 'menu'),
                    new MenuItem('https://geekbrains.ru', 'blog'),
                ], 'ChildMenu', 'https://geekbrains.ru')
            ]
    var menu = new SuperMenu('menu', 'menu', items);

    document.body.appendChild(menu.render());
}
