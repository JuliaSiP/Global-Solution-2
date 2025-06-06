document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os checkboxes na página
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    /**
     * Carrega o estado salvo dos checkboxes do localStorage.
     * Marca os checkboxes que estavam previamente marcados.
     */
    function loadChecklistState() {
        checkboxes.forEach(checkbox => {
            const itemId = checkbox.dataset.itemId; // Obtém o ID único do item
            if (itemId) {
                const isChecked = localStorage.getItem(itemId) === 'true';
                checkbox.checked = isChecked;
                // Adiciona ou remove a classe 'checked' no elemento pai <li>
                if (isChecked) {
                    checkbox.closest('li').classList.add('checked');
                } else {
                    checkbox.closest('li').classList.remove('checked');
                }
            }
        });
    }

    /**
     * Salva o estado atual de um checkbox no localStorage.
     * @param {HTMLInputElement} checkbox - O elemento checkbox cujo estado será salvo.
     */
    function saveChecklistItemState(checkbox) {
        const itemId = checkbox.dataset.itemId; // Obtém o ID único do item
        if (itemId) {
            localStorage.setItem(itemId, checkbox.checked);
        }
    }

    // Adiciona um 'event listener' para cada checkbox
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            const listItem = event.target.closest('li'); // Encontra o elemento <li> pai do checkbox
            if (event.target.checked) {
                listItem.classList.add('checked'); // Adiciona a classe 'checked' se o checkbox for marcado
            } else {
                listItem.classList.remove('checked'); // Remove a classe 'checked' se o checkbox for desmarcado
            }
            saveChecklistItemState(event.target); // Salva o estado no localStorage
        });
    });

    // Carrega o estado do checklist quando a página é carregada
    loadChecklistState();
});
