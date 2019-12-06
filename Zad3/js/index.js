document.addEventListener('DOMContentLoaded', function () {
    loadBuiltInRecipes();

    $('form').on('submit', function(e) {
        e.preventDefault();
    });

});

const recipesData = function () {
    return {
        recipes: [
            {
                name: 'Przepis 1',
                url: 'food1.png',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                ingredients: [
                    '250 g wołowiny (mięso powinno mieć ok. 20% tłuszczu)',
                    'sól morska',
                    'młotkowany czarny pieprz'
                ]
            },
            {
                name: 'Przepis 2',
                url: 'food2.jpg',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                ingredients: [
                    'Ingredient 1',
                    'Ingredient 2'
                ]
            },
            {
                name: 'Przepis 3',
                url: 'food3.jpg',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                ingredients: [
                    'Ingredient 1',
                    'Ingredient 2',
                    'Ingredient 3',
                    'Ingredient 4',
                    'Ingredient 5',
                    'Ingredient 6'
                ]
            },
            {
                name: 'Przepis 4',
                url: 'food4.jpg',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                ingredients: [
                    'passata pomidorowa',
                    'mielona wołowina',
                    'makaron spaghetti',
                    'tarty parmezan',
                    'koncentrat pomidorowy',
                    'ząbek czosnku',
                    'cebula',
                    'suszony tymianek',
                    'suszone oregano',
                    'oliwa z oliwek',
                    'sól, pieprz, świerza bazylia'
                ]
            },
            {
                name: 'Przepis 5',
                url: 'food5.jpg',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                ingredients: [
                    'Ingredient 1',
                    'Ingredient 2',
                    'Ingredient 3'
                ]
            },
            {
                name: 'Przepis 6',
                url: 'food6.jpg',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                ingredients: [
                    'Ingredient 1',
                    'Ingredient 2',
                    'Ingredient 3',
                    'Ingredient 4',
                    'Ingredient 5'
                ]
            }
        ]
    };
};

const loadBuiltInRecipes = function () {
    const data = recipesData();
    for (i in data.recipes) {
        const recipe = data.recipes[i];
        addRecipeContainer(recipe);
    }
};

const addRecipeContainer = function (recipe, removable) {
    const recipesArea = document.getElementById('section-recipes');

    let recipeContainer = document.createElement('recipe-container');
    let recipeImgContainer = document.createElement('div');

    let recipeImg = document.createElement('img');
    let button = document.createElement('button');
    let buttonClose = document.createElement('span');

    let recipeDescriptionContainer = document.createElement('div');
    let recipeDescriptionTitle = document.createElement('h2');
    let recipeDescriptionSubtitle = document.createElement('p');

    recipeImgContainer.classList.add('recipe-img-container');
    recipeImg.classList.add('recipe-img');
    recipeImg.setAttribute('src', recipe.url);
    recipeImg.setAttribute('alt', 'recipe-img');

    button.classList.add('btn', 'btn-medium', 'btn-white-opacity', 'div-center-vh');
    button.innerText = 'Zobacz przepis';

    buttonClose.innerText = 'x';

    recipeDescriptionContainer.classList.add('recipe-description-container');
    recipeDescriptionTitle.innerHTML = recipe.name;
    recipeDescriptionSubtitle.innerHTML = recipe.description;

    button.onclick = function (event) {
        onRecipeClick(recipe, recipeImg, event);
    };

    buttonClose.onclick = function (event) {
        recipesArea.removeChild(recipeContainer);
    };

    recipeImg.onclick = function (event) {
        onRecipeClick(recipe, recipeImg, event);
    };

    recipeImgContainer.append( recipeImg, button);
    if(removable) {
        recipeImgContainer.append(buttonClose);
    }

    recipeDescriptionContainer.append(recipeDescriptionTitle, recipeDescriptionSubtitle);
    recipeContainer.append(recipeImgContainer, recipeDescriptionContainer);

    recipesArea.appendChild(recipeContainer);
};

const onRecipeClick = function (recipe, recipeImg, event) {
    let opacity = recipeImg.style.opacity;
    if (opacity === '') opacity = '1';

    const imgs = document.getElementsByClassName('recipe-img');
    let allHiddenBefore = true;
    for (i in imgs) {
        if (imgs[i] instanceof HTMLImageElement) {
            if (imgs[i].style.opacity === '0.5') allHiddenBefore = false;
            imgs[i].style.opacity = '1';
        }
    }

    recipeImg.style.opacity = (opacity === '1' ? '0.5' : '1');

    if (opacity === '0.5' || allHiddenBefore) {
        const rdArea = document.getElementById('rd-area');
        const children = rdArea.getElementsByTagName('*');
        rdArea.classList.toggle('hidden');
        for (let i = 0; i < children.length; i++) {
            children[i].classList.toggle('hidden');
        }
    }
    updateRecipeDetails(recipe);
    event.stopPropagation();
};

const updateRecipeDetails = function (recipe) {
    document.getElementById('rd-img').setAttribute('src', recipe.url)
    document.getElementById('rd-recipe-name').innerText = recipe.name;
    document.getElementById('rd-description').innerText = recipe.description;

    const ingredientsArea = document.getElementById('rd-ingredients');
    while (ingredientsArea.firstChild) {
        ingredientsArea.removeChild(ingredientsArea.firstChild);
    }
    for (i in recipe.ingredients) {
        let ing = document.createElement('li');
        ing.innerText = recipe.ingredients[i];
        ingredientsArea.appendChild(ing);
    }
};

const showRecipeModal = function () {
    document.getElementById('add-recipe-modal').style.visibility = 'visible';
    document.getElementById('add-recipe-modal').style.opacity = '1';
};

const closeRecipeModal = function () {
    document.getElementById('add-recipe-modal').style.visibility = 'hidden';
    document.getElementById('add-recipe-modal').style.opacity = '0';
};

const addNewRecipe = function () {
    let data = $('form').serializeArray();

    let recipe = {
        name: data[0].value,
        url: data[1].value,
        ingredients: data[2].value.split(' '),
        description: data[3].value
    };

    addRecipeContainer(recipe, true);
    $('#add-recipe-form')[0].reset();
    closeRecipeModal();
};