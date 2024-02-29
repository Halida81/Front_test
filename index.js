function fetchUsers(sortParam, filterCriteria) {
    const usersContainer = document.getElementById('users');
    usersContainer.innerHTML = '';

    let apiUrl = `https://jsonplaceholder.typicode.com/users?_sort=${sortParam}`;

    if (filterCriteria) {
      apiUrl += `&${sortParam}_like=${filterCriteria}`;
    }

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error loading data');
        }
        return response.json();
      })
      .then(users => {
        if(!users.length){
            const notFoundText = document.createElement('h3');
            notFoundText.textContent = 'No users found!';
            usersContainer.appendChild(notFoundText);
          }
        users.map(user => {
          const userDiv = document.createElement('div');
          userDiv.className = 'user-card';
          userDiv.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Phone number:</strong> ${user.phone}</p>
            <hr>
          `;
          usersContainer.appendChild(userDiv);
        });
      })
      .catch(error => {
        console.error('Error loading data:', error);
        const errorMessage = document.createElement('p');
        errorMessage.style.color = 'red';
        errorMessage.textContent = 'Error loading data. Please try again!';
        usersContainer.appendChild(errorMessage);
      });
  }

  document.addEventListener("DOMContentLoaded", function() {
    const refreshButton = document.getElementById('refreshButton');
    const sortParamSelect = document.getElementById('sortParam');
    const filterCriteriaInput = document.getElementById('filterCriteria');

    refreshButton.addEventListener('click', function() {
      const selectedSortParam = sortParamSelect.value;
      const filterCriteria = filterCriteriaInput.value;
      fetchUsers(selectedSortParam, filterCriteria);
    });

    sortParamSelect.addEventListener('change', function() {
      const selectedSortParam = sortParamSelect.value;
      const filterCriteria = filterCriteriaInput.value;
      fetchUsers(selectedSortParam, filterCriteria);
    });

    filterCriteriaInput.addEventListener('input', function() {
      const selectedSortParam = sortParamSelect.value;
      const filterCriteria = filterCriteriaInput.value;
      fetchUsers(selectedSortParam, filterCriteria);
    });

    fetchUsers('name', '');
  });