import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
*,
*::before,
*::after {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

/* Custom Properties */

:root {
	--ff-primary: 'Lora', serif;
	--ff-secondary: 'Roboto Slab', serif;
	--ff-third: 'Roboto', sans-serif;

	--fw-reg: 500;
	--fw-bold: 700;

	--clr-light: #fff;
	--bg-black: #000000;
	--clr-dark: #3c3030b5;
	--clr-accent: #f8333c;
	--light-blue: #377cff;
	--cream: #e5e5e5;
	--clr-green: #008074;
	--clr-red: #ff5049;
	--clr-light-white:  #e2d7d759;
	--clr-light-red:  #ff504930;
	--clr-light-dark:  #322a2ab8;
	--clr-thick-gray:  #80808038;

}

html{
	font-size: 16px;
}

@media (max-width: 420px){
		html{
			font-size: 14px;
		}
	}
@media (max-width: 280px){
		html{
			font-size: 10px;
		}
	}


/* General styles */

body {
	background-color: var(--clr-light);
	color: var(--clr-dark);
	font-family: var(--ff-third);
  max-width: 2000px;
  width: 100%;
  margin: 0 auto;
	overflow: overlay;
}
::-webkit-scrollbar{
	display: none;
}

ul,
li {
	text-decoration: none;
	margin: 0;
	padding: 0;
  list-style: none;
	animation: opacity 0.2s linear;
		@keyframes opacity{
			from{
				opacity: 0;
				transform: scale(0.7);
			}
		}
}

button {
	outline: none;
	cursor: pointer;
	border: none;
}

a {
	text-decoration: none;
}

input {
	outline: none;
}

	.active{
		animation: del 0.3s linear;
	}
	@keyframes del{
		to{
			opacity: 0;
			transform: rotate(15deg) skew(25deg) scale(0.5);
		}
	}

`;