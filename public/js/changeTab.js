function changeTab(tabIndex) {
	const tabs = document.getElementsByClassName('tab');
	const table = document.querySelector('.myTable');
	const amazonInstance = document.querySelector('.amazon-instance');
	const ownServer = document.querySelector('.own-server');
	console.log(amazonInstance);
	console.log(ownServer);
	// Set active tab
	for (let i = 0; i < tabs.length; i++) {
	  if (i === tabIndex) {
		tabs[i].classList.add('active');
	  } else {
		tabs[i].classList.remove('active');
	  }
	}
  
	// Update table content
	if (tabIndex === 0) {
		amazonInstance.style.display = 'none'
		ownServer.style.display = 'block'
	} else if (tabIndex === 1) {
		ownServer.style.display = 'none'
		amazonInstance.style.display = 'block'
	}
  }
  