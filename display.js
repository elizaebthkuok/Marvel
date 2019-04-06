function DisplayElement(id, parent, element_type) {
    this.parent = parent;
    this.element = document.createElement(element_type || 'div');
    this.element.id = id;
    this.listeners = {};
}
DisplayElement.prototype.attach = function() {
    this.parent.appendChild(this.element);
}
DisplayElement.prototype.addText = function(text) {
    let textNode = document.createTextNode(text);
    this.element.appendChild(textNode);
}
DisplayElement.prototype.addClass = function(class_name) {
    this.element.classList.add(class_name);
}
DisplayElement.prototype.toggleClass = function (class_name) {
    this.element.classList.toggle(class_name);
}
DisplayElement.prototype.addListener = function(name, cb) {
    this.element.addEventListener(name, cb);
    if (this.listeners[name]) {
        this.listeners[name].push(cb);
    } else {
        this.listeners[name] = [cb];
    }
}
DisplayElement.prototype.setInnerHtml = function(html) {
    this.element.innerHTML = html;
}

function HeroCard(id, parent) {
    DisplayElement.call(this, id, parent);
}
HeroCard.prototype = Object.create(DisplayElement.prototype);
Object.defineProperty(HeroCard.prototype, 'constructor', {
    value: HeroCard,
    enumerable: false,
    writable: true
});

HeroCard.prototype.createInnerHtml = function (hero_data) {
    return `
        <div class="media">
            <img src="${hero_data.thumbnail.path + "." + hero_data.thumbnail.extension}" class="img-thumbnail img-200 align-self-center mr-3" alt=${hero_data.name}>
            <div class="media-body">
                <h5 class="mt-0">${hero_data.name}</h5>
                <p>${hero_data.description}</p>
            </div>
        </div>`;
}

function HeroFav(id, parent) {
    DisplayElement.call(this, id, parent);
}
HeroFav.prototype = Object.create(DisplayElement.prototype);
Object.defineProperty(HeroFav.prototype, 'constructor', {
    value: HeroCard,
    enumerable: false,
    writable: true
});
HeroFav.prototype.create = function(hero_data) {
    let mediaDiv = document.createElement('div');
    mediaDiv.classList.add('media');
    mediaDiv.innerHTML = `
        <img src="${hero_data.thumbnail.path + "." + hero_data.thumbnail.extension}" class="img-thumbnail img-60 align-self-center mr-3" alt=${hero_data.name}>
        <div class="media-body">
            <p>${hero_data.name}</p>
        </div>`;
    
    this.element.appendChild(mediaDiv); 

    const btn = new DisplayElement(`btn-${hero_data.id}`, mediaDiv, 'button');
    btn.addText('x');
    btn.element.classList.add('btn', 'btn-sm', 'btn-danger', 'remove-btn');
    btn.attach();
    this.removeButton = btn;
}
HeroFav.prototype.addOnRemove = function(cb) {
    this.removeButton.addListener('click', cb);
}


function createHeroCard(id, parent, data) {
    const hero = new HeroCard(id, parent);
    hero.addClass('hero-card');
    if (localStorage.getItem(data.id)) {
        hero.addClass('favorite');
    }
    hero.setInnerHtml( hero.createInnerHtml(data) );
    hero.attach();
    return hero;
}

function createHeroFav(id, parent, data) {
    const fav = new HeroFav(id, parent, data);
    fav.create(data);
    fav.attach();
    return fav;
}


// Make hero card larger on hover

// Make hero cards fade in

// Spinner while waiting for request from server

// Show button to view hero details when hover on hero card