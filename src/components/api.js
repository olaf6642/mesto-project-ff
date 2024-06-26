const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-11',
  headers: {
    authorization: '8d3fd7a5-fe5c-45bd-a76a-627c88eada83',
    'Content-Type': 'application/json'
  }
}

function handleResponse(res) {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка: ${res.status}`);
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
		.then( res => {
			return handleResponse(res);
		})
} 

export const getCurrentUser = () => {
	return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
	.then( res => {
		return handleResponse(res);
	})
}

export const editUser = (newName, newAbout) => {
	return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			name: newName,
			about: newAbout
		})
  })
	.then( res => {
		return handleResponse(res);
	})
}

export const editUserAvatar = (newAvatar) => {
	return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			avatar: newAvatar
		})
  })
	.then( res => {
		return handleResponse(res);
	})
}

export const addNewCard = (cardName, cardLink) => {
	return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
		headers: config.headers,
		body: JSON.stringify({
			name: cardName,
			link: cardLink
		})
  })
	.then( res => {
		return handleResponse(res);
	})
}

export const removeCard = (cardId) => {
	return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
		headers: config.headers
  })
	.then( res => {
		return handleResponse(res);
	})
}

export const addLike = (cardId) => {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
		headers: config.headers
  })
	.then( res => {
		return handleResponse(res);
	})
}

export const removeLike = (cardId) => {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
		headers: config.headers
  })
	.then( res => {
		return handleResponse(res);
	})
}