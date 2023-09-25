const searchForm = document.getElementById('searchForm');
const result = document.querySelector('.result');

// Mostrar valores ingresados para consulta
searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada
    const searchTerm = document.querySelector('.barbuscar').value;

    // Llamar a la función para buscar recetas por ingrediente
    searchMeal(searchTerm);
});

function searchMeal(strIngredient) {
    // Corregir la URL de la API para buscar recetas por categoría
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${strIngredient}`)
        .then((res) => res.json())
        .then((data) => {
            // Limpiar los resultados anteriores
            result.innerHTML = '';

            // Mostrar los resultados
            if (data.meals && data.meals.length > 0) {
                data.meals.forEach((food) => {

                    const h2 = document.createElement('h2');
                    h2.textContent = ` MEAL:   ${food.strMeal} `;

                    const img = document.createElement('img');
                    img.src = food.strMealThumb;

                    const h3 = document.createElement('h3');
                    h3.textContent = ` Ingredient: ${food.strIngredient1}, ${food.strIngredient2},${food.strIngredient3},${food.strIngredient4},${food.strIngredient5} ,${food.strIngredient6} ,${food.strIngredient7},${food.strIngredient8},${food.strIngredient9},${food.strIngredient10}       `;

                    const p = document.createElement('p');
                    p.textContent = ` Instruction: ${food.strInstructions} `;

                    const span = document.createElement('span');
                    span.textContent = `  ----------♣---------- `;

                    const div = document.createElement('div');
                    div.appendChild(h2);
                    div.appendChild(img);
                  
                    div.appendChild(h3);
                    div.appendChild(p);
                    div.appendChild(span);

                    result.appendChild(div);
                });
            } else {
                // Mostrar un mensaje si no se encontraron resultados
                const mensaje = document.createElement('p');
                mensaje.textContent = 'No se encontraron resultados.';
                result.appendChild(mensaje);
            }
        })
        .catch((error) => {
            console.error('Error al buscar recetas:', error);
        });
}
