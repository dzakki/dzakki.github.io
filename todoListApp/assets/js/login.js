window.addEventListener('DOMContentLoaded', (event) => {
    if(isLogin()){
		window.location.href = 'dashboard.html'	
	}
	
});
function isGmail (gmail) {
	let res = ''
	let bool = false
	for (var i = 0; i < gmail.length; i++) {
		if (gmail[i] === '.') {
			bool = !bool
			break;
		}
		if (bool) res += gmail[i] 
		if (gmail[i] === '@') bool = !bool
	}
	return  res === 'gmail'
}
function setItem(gmail) {
	localStorage.clear();
	localStorage.setItem('gmail', gmail)
	let object = {
			items: [],
			total: 0,
		}
	localStorage.setItem('nextUp', JSON.stringify(object))
	localStorage.setItem('onProgress', JSON.stringify(object))
	localStorage.setItem('done', JSON.stringify(object))
	return true
}
function isLogin() {
	let IsLogin = localStorage.getItem('gmail')
	if (IsLogin) return true
	return false
}
function login() {
	let gmail = document.getElementById('gmail').value
	if (!gmail.length) {
		alert('gmail is required')
		return false
	}
	let checkGmail = isGmail(gmail)
	if (!checkGmail) {
		alert('login must use gmail')
		return false
	}
	setItem(gmail)
	window.location.href = 'dashboard.html'
}
