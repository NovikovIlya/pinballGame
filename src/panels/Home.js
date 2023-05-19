import React,{useEffect, useRef, useState} from 'react';
import './Home.css'
import  Matter  from 'matter-js'
import bridge from '@vkontakte/vk-bridge';
import MatterAttractors from 'matter-attractors'
import { Link, useParams } from 'react-router-dom'
import { useSetPoint } from '../Store.jsx';
import { useReclama } from '../Store2';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Snackbar ,Panel, PanelHeader, Header, Group, Cell, Div, Avatar,Button,Input } from '@vkontakte/vkui';
import { collection, query, where,getDocs,setDoc ,doc,orderBy,limit  } from "firebase/firestore";
import { getDatabase, ref, orderByChild } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import Spinner from 'react-bootstrap/Spinner';
import { Icon16Done } from '@vkontakte/icons';
import { nanoid } from 'nanoid'

const firebaseConfig = {
	apiKey: "AIzaSyA_vN4xB-2UPviEZRZjlc3JaPNwXcx_wW0",
	authDomain: "bingo-ef543.firebaseapp.com",
	projectId: "bingo-ef543",
	storageBucket: "bingo-ef543.appspot.com",
	messagingSenderId: "461446988848",
	appId: "1:461446988848:web:97d1ac44677a7635bbd9f5",
	measurementId: "G-JWFEQL4MBV"
  };
  
  
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

const Home = ({ id, go, fetchedUser }) => {
	history.pushState(null, null, null);
	window.addEventListener("popstate", (event) => {
		event.preventDefault();
			if (document.querySelector('.alam').classList.contains('zero')){
				if (visible === true){
					console.log('trueModalka')
					bridge.send('VKWebAppClose', {
						status: 'success',
						payload: {
						  name: 'value'
						}})
						.then((data) => { 
						  if (data.status) {
							// Событие отправлено
						  }
						})
						.catch((error) => {
						  // Ошибка
						  console.log(error);
						});
				}
				// setOpen(false);
				
				
					
			}
			else{
				console.log('falseModalka')

				
				const setShow1 = ()=>{
					setShow(true)
				}
				setTimeout(setShow1,100)
				
			}
			
		}
	  );


	const replaceDisallowedWords = require('disallowed-word-filter')
	const myFilter = new replaceDisallowedWords({
  		additionalWords: 'Привет,Хуй,Пизда, Пока', // Дополнительные запрещенные слова
	})

	bridge.send('VKWebAppCheckNativeAds', { ad_format: 'interstitial' })
	.then((data) => {
		if (data.result) {
		} else {
		console.log('Рекламные материалы не найдены.');
		}
	})
	.catch((error) => { console.log(error); /* Ошибка */  });

	function fooButtonClick(){
	// Показать рекламу
	bridge.send('VKWebAppShowNativeAds', { ad_format: 'interstitial' })
		.then((data) => {
		if (data.result) // Успех
			console.log('Реклама показана');
		else // Ошибка 
			console.log('Ошибка при показе');
		})
		.catch((error) => { console.log(error); /* Ошибка */ });
	}
	
	const [text, setText] = React.useState('');
	const [snackbar, setSnackbar] = React.useState(null);
	const [stop,setStop] = useState(false)
	const [balli,setBalli] = useState(0)
	const isPressed = useRef(false)
	const [fullscreen, setFullscreen] = useState(true);
	const [show, setShow] = useState(true);
	const [VseSlovaData,setVseSlovaData] = useState([{}])
	const [text1,setText1] = useState('')
	const [spinValue,setSpinValue] = useState(false)
	const [spinValue1,setSpinValue1] = useState(true)
	const [visible,setVisible] = useState(true)
  	const [text2,setText2] = useState('')
	const [conditionValue,setContditionValue] = useState(false)
	const [modalka,setModalka] = useState(true)
	const [proverka,setProverka] = useState(false)

	const handleClose = () => {
		setModalka(false)
		if (itemReclama === false){
			async function pul(){
				setSpinValue(true)
				setShow(false);
				setVisible(true)
				
				setTimeout(fooButtonClick,1000)
	
				const haha = ()=>{
					setSpinValue(false)
				}
				setTimeout(haha,2000)
				
	

				const shsh=()=>{
					setVisible(false)
				}
				setTimeout(shsh,2000)

				switchReclama()
				
			}
			pul()
			
		}
		else if (itemReclama === true){
			setShow(false);
			switchReclama()
			setVisible(false)
		}
		

	}
	
	function handleShow(breakout) {
		setFullscreen(breakout);
		setShow(true);
		setModalka(true)
	  }
	

	useEffect(()=>{
	const her = () => {
		// plugins
		Matter.use(MatterAttractors);
	
		// constants
		const PATHS = {
			DOME: '0 0 0 250 19 250 20 231.9 25.7 196.1 36.9 161.7 53.3 129.5 74.6 100.2 100.2 74.6 129.5 53.3 161.7 36.9 196.1 25.7 231.9 20 268.1 20 303.9 25.7 338.3 36.9 370.5 53.3 399.8 74.6 425.4 100.2 446.7 129.5 463.1 161.7 474.3 196.1 480 231.9 480 250 500 250 500 0 0 0',
			DROP_LEFT: '0 0 20 0 70 100 20 150 0 150 0 0',
			DROP_RIGHT: '50 0 68 0 68 150 50 150 0 100 50 0',
			APRON_LEFT: '0 0 180 120 0 120 0 0',
			APRON_RIGHT: '180 0 180 120 0 120 180 0'
		};
		const COLOR = {
			BACKGROUND: '#212529',
			
			// OUTER: '#495057',
			OUTER: '#ffffff',
			INNER: '#15aabf',
			BUMPER: '#86DFFF',
			BUMPER_LIT: '#fff3bf',
			PADDLE: '#e64980',
			PINBALL: '#dee2e6'
		};
		const GRAVITY = 0.75;
		const WIREFRAMES = false;
		const BUMPER_BOUNCE = 1.5;
		const PADDLE_PULL = 0.002;
		const MAX_VELOCITY = 50;
	
		// score elements
		let $currentScore = $('.current-score span');
		let $highScore = $('.high-score1');
	
		// shared variables
		let currentScore, highScore;
		let engine, world, render, pinball, stopperGroup;
		let leftPaddle, leftUpStopper, leftDownStopper, isLeftPaddleUp;
		let rightPaddle, rightUpStopper, rightDownStopper, isRightPaddleUp;
	
		function load() {
			init();
			createStaticBodies();
			createPaddles();
			createPinball();
			createEvents();
			
			
		}

	
		const init = () =>{
			var myAudio = new Audio();
			myAudio.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
			
			// engine (shared)
			engine = Matter.Engine.create();
			const knopka = document.querySelector('.tyk')
			engine.timing.timeScale = 0
			knopka.addEventListener('click',()=>{
				engine.timing.timeScale = 0
			})
			const knopka2 = document.querySelector('.tyk2')
			knopka2.addEventListener('click',()=>{
				engine.timing.timeScale = 1
				// myAudio.play();
			})

			const menuKnopka = document.querySelector('.menu')
			menuKnopka.addEventListener('click',()=>{
				engine.timing.timeScale = 0
				myAudio.pause();
			})

			// const liveText = document.querySelector('.livelive')
			// liveText.innerText = Live
			
			

	
			// world (shared)
			world = engine.world;
			world.bounds = {
				min: { x: 0, y: 0},
				max: { x: 500, y: 800 }
			};
			world.gravity.y = GRAVITY; // simulate rolling on a slanted table
	
			// render (shared)
			render = Matter.Render.create({
				element: $('.container')[0],
				engine: engine,
				options: {
					width: world.bounds.max.x,
					height: world.bounds.max.y,
					wireframes: WIREFRAMES,
					background: COLOR.BACKGROUND
				}
			});
			Matter.Render.run(render);

			// runner
			let runner = Matter.Runner.create();
			if (stop === false){
				Matter.Runner.run(runner, engine);
			}
			
			else if (stop === true){
				Matter.Runner.stop(runner)
			}
	
			// used for collision filtering on various bodies
			stopperGroup = Matter.Body.nextGroup(true);
	
			// starting values
			currentScore = 0;
			highScore = Point;
			isLeftPaddleUp = false;
			isRightPaddleUp = false;
		}
	
		function createStaticBodies() {
			Matter.World.add(world, [
				// table boundaries (top, bottom, left, right)
				boundary(250, -30, 500, 100),
				boundary(250, 830, 500, 100),
				boundary(-30, 400, 100, 800),
				boundary(530, 400, 100, 800),
	
				// dome
				path(250, 89, PATHS.DOME),
	
				// pegs (left, mid, right)
				wall(140, 140, 20, 40, COLOR.INNER),
				wall(225, 140, 20, 40, COLOR.INNER),
				wall(310, 140, 20, 40, COLOR.INNER),
				
				
	
				// top bumpers (left, mid, right)Круглешки
				// bumper(105, 250),
				bumper(165, 250),
				bumper(285, 250),
				// bumper(45, 250),
				// bumper(345, 250),
	
				// bottom bumpers (left, right)
				bumper(45, 340),
				// bumper(45, 340),
				bumper(225, 340),
				// bumper(225, 430),
				// bumper(285, 340),
				bumper(405, 340),
	
				// shooter lane wall
				wall(440, 520, 20, 560, COLOR.OUTER),
	
				// drops (left, right)
				path(25, 360, PATHS.DROP_LEFT),
				path(425, 360, PATHS.DROP_RIGHT),
	
				// slingshots (left, right)
				wall(120, 510, 20, 120, COLOR.INNER),
				wall(330, 510, 20, 120, COLOR.INNER),
	
				// out lane walls (left, right)
				wall(60, 529, 20, 160, COLOR.INNER),
				wall(390, 529, 20, 160, COLOR.INNER),
	
				// flipper walls (left, right);
				wall(93, 624, 20, 98, COLOR.INNER, -0.96),
				wall(357, 624, 20, 98, COLOR.INNER, 0.96),
	
				// aprons (left, right)
				path(79, 740, PATHS.APRON_LEFT),
				path(371, 740, PATHS.APRON_RIGHT),
	
				// reset zones (center, right)
				reset(225, 50),
				reset(465, 30)
			]);
		}
	
		function createPaddles() {
			
			// these bodies keep paddle swings contained, but allow the ball to pass through
			leftUpStopper = stopper(160, 591, 'left', 'up');
			leftDownStopper = stopper(140, 743, 'left', 'down');
			rightUpStopper = stopper(290, 591, 'right', 'up');
			rightDownStopper = stopper(310, 743, 'right', 'down');
			Matter.World.add(world, [leftUpStopper, leftDownStopper, rightUpStopper, rightDownStopper]);
	
			// this group lets paddle pieces overlap each other
			let paddleGroup = Matter.Body.nextGroup(true);
	
			// Left paddle mechanism
			let paddleLeft = {};
			paddleLeft.paddle = Matter.Bodies.trapezoid(170, 660, 20, 80, 0.33, {
				label: 'paddleLeft',
				angle: 1.57,
				chamfer: {},
				render: {
					fillStyle: COLOR.PADDLE
				}
			});
			paddleLeft.brick = Matter.Bodies.rectangle(172, 672, 40, 80, {
				angle: 1.62,
				chamfer: {},
				render: {
					visible: false
				}
			});
			paddleLeft.comp = Matter.Body.create({
				label: 'paddleLeftComp',
				parts: [paddleLeft.paddle, paddleLeft.brick]
			});
			paddleLeft.hinge = Matter.Bodies.circle(142, 660, 5, {
				isStatic: true,
				render: {
					visible: false
				}
			});
			Object.values(paddleLeft).forEach((piece) => {
				piece.collisionFilter.group = paddleGroup
			});
			paddleLeft.con = Matter.Constraint.create({
				bodyA: paddleLeft.comp,
				pointA: { x: -29.5, y: -8.5 },
				bodyB: paddleLeft.hinge,
				length: 0,
				stiffness: 0
			});
			Matter.World.add(world, [paddleLeft.comp, paddleLeft.hinge, paddleLeft.con]);
			Matter.Body.rotate(paddleLeft.comp, 0.57, { x: 142, y: 660 });
	
			// right paddle mechanism
			let paddleRight = {};
			paddleRight.paddle = Matter.Bodies.trapezoid(280, 660, 20, 80, 0.33, {
				label: 'paddleRight',
				angle: -1.57,
				chamfer: {},
				render: {
					fillStyle: COLOR.PADDLE
				}
			});
			paddleRight.brick = Matter.Bodies.rectangle(278, 672, 40, 80, {
				angle: -1.62,
				chamfer: {},
				render: {
					visible: false
				}
			});
			paddleRight.comp = Matter.Body.create({
				label: 'paddleRightComp',
				parts: [paddleRight.paddle, paddleRight.brick]
			});
			paddleRight.hinge = Matter.Bodies.circle(308, 660, 5, {
				isStatic: true,
				render: {
					visible: false
				}
			});
			Object.values(paddleRight).forEach((piece) => {
				piece.collisionFilter.group = paddleGroup
			});
			paddleRight.con = Matter.Constraint.create({
				bodyA: paddleRight.comp,
				pointA: { x: 29.5, y: -8.5 },
				bodyB: paddleRight.hinge,
				length: 0,
				stiffness: 0
			});
			Matter.World.add(world, [paddleRight.comp, paddleRight.hinge, paddleRight.con]);
			Matter.Body.rotate(paddleRight.comp, -0.57, { x: 308, y: 660 });
		}
	
		function createPinball() {
			// x/y are set to when pinball is launched
			pinball = Matter.Bodies.circle(0, 0, 14, {
				label: 'pinball',
				collisionFilter: {
					group: stopperGroup
				},
				render: {
					fillStyle: COLOR.PINBALL
				}
			});
			Matter.World.add(world, pinball);
			launchPinball();
		}
	
		function createEvents() {
			var myAudio3 = new Audio();
			myAudio3.src = 'https://orteil.dashnet.org/cookieclicker/snd/clickb5.mp3'
			var myAudio2 = new Audio();
			myAudio2.src = 'https://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3'
			// events for when the pinball hits stuff
			Matter.Events.on(engine, 'collisionStart', function(event) {
				let pairs = event.pairs;
				pairs.forEach(function(pair) {
					if (pair.bodyB.label === 'pinball') {
						switch (pair.bodyA.label) {
							case 'reset':
								launchPinball();
								myAudio2.play()
								break;
							case 'bumper':
								pingBumper(pair.bodyA);
								
								break;
						}
					}
				});
			});
	
			// regulate pinball
			Matter.Events.on(engine, 'beforeUpdate', function(event) {
				// bumpers can quickly multiply velocity, so keep that in check
				Matter.Body.setVelocity(pinball, {
					x: Math.max(Math.min(pinball.velocity.x, MAX_VELOCITY), -MAX_VELOCITY),
					y: Math.max(Math.min(pinball.velocity.y, MAX_VELOCITY), -MAX_VELOCITY),
				});
	
				// cheap way to keep ball from going back down the shooter lane
				if (pinball.position.x > 450 && pinball.velocity.y > 0) {
					Matter.Body.setVelocity(pinball, { x: 0, y: -10 });
				}
			});
	
			// mouse drag (god mode for grabbing pinball)
			Matter.World.add(world, Matter.MouseConstraint.create(engine, {
				mouse: Matter.Mouse.create(render.canvas),
				constraint: {
					stiffness: 0.2,
					render: {
						visible: false
					}
				}
			}));
	
			// keyboard paddle events
			$('body').on('keydown', function(e) {
				if (e.which === 37) { // left arrow key
					isLeftPaddleUp = true;
					myAudio3.play()
				} else if (e.which === 39) { // right arrow key
					isRightPaddleUp = true;
					myAudio3.play()
				}
			});
			$('body').on('keyup', function(e) {
				if (e.which === 37) { // left arrow key
					isLeftPaddleUp = false;
				} else if (e.which === 39) { // right arrow key
					isRightPaddleUp = false;
				}
			});
	
			// click/tap paddle events
			$('.left-trigger')
				
				.on('mousedown touchstart', function(e) {
					isLeftPaddleUp = true;
					myAudio3.play()
					
				})
				.on('mouseup touchend', function(e) {
					isLeftPaddleUp = false;
					
				});
			$('.right-trigger')
			.on('mousedown touchstart', function(e) {
					isRightPaddleUp = true;
					myAudio3.play()
				})
				.on('mouseup touchend', function(e) {
					isRightPaddleUp = false;
				});
		}
	
		function launchPinball() {
			updateScore(0);
			Matter.Body.setPosition(pinball, { x: 465, y: 765 });
			Matter.Body.setVelocity(pinball, { x: 0, y: -25 + rand(-2, 2) });
			Matter.Body.setAngularVelocity(pinball, 0);
		}
	
		const pingBumper = (bumper) =>{
			var myAudio1 = new Audio();
			myAudio1.src = 'https://codeskulptor-demos.commondatastorage.googleapis.com/pang/arrow.mp3'
			myAudio1.play();
			updateScore(currentScore + 10);
	
			// flash color
			bumper.render.fillStyle = COLOR.BUMPER_LIT;
			setTimeout(function() {
				bumper.render.fillStyle = COLOR.BUMPER;
				
			}, 100);
		}
	
		function updateScore(newCurrentScore) {
			currentScore = newCurrentScore;
			$currentScore.text(currentScore);
	
			highScore = Math.max(currentScore, highScore);
			$highScore.text(highScore);
		}
	
		// matter.js has a built in random range function, but it is deterministic
		function rand(min, max) {
			return Math.random() * (max - min) + min;
		}
	
		// outer edges of pinball table
		function boundary(x, y, width, height) {
			return Matter.Bodies.rectangle(x, y, width, height, {
				isStatic: true,
				render: {
					fillStyle: COLOR.OUTER
				}
			});
		}
	
		// wall segments
		function wall(x, y, width, height, color, angle = 0) {
			return Matter.Bodies.rectangle(x, y, width, height, {
				angle: angle,
				isStatic: true,
				chamfer: { radius: 10 },
				render: {
					fillStyle: color
				}
			});
		}
	
		// bodies created from SVG paths
		function path(x, y, path) {
			let vertices = Matter.Vertices.fromPath(path);
			return Matter.Bodies.fromVertices(x, y, vertices, {
				isStatic: true,
				render: {
					fillStyle: COLOR.OUTER,
	
					// add stroke and line width to fill in slight gaps between fragments
					strokeStyle: COLOR.OUTER,
					lineWidth: 1
				}
			});
		}
	
		// round bodies that repel pinball
		function bumper(x, y) {
			let bumper = Matter.Bodies.circle(x, y, 25, {
				label: 'bumper',
				isStatic: true,
				render: {
					fillStyle: COLOR.BUMPER
				}
			});
	
			// for some reason, restitution is reset unless it's set after body creation
			bumper.restitution = BUMPER_BOUNCE;
	
			return bumper;
		}
	
		// invisible bodies to constrict paddles
		function stopper(x, y, side, position) {
			
			// determine which paddle composite to interact with
			let attracteeLabel = (side === 'left') ? 'paddleLeftComp' : 'paddleRightComp';
	
			return Matter.Bodies.circle(x, y, 40, {
				isStatic: true,
				render: {
					visible: false,
				},
				collisionFilter: {
					group: stopperGroup
				},
				plugin: {
					attractors: [
						// stopper is always a, other body is b
						function(a, b) {
							

							if (b.label === attracteeLabel) {
								let isPaddleUp = (side === 'left') ? isLeftPaddleUp : isRightPaddleUp;
								let isPullingUp = (position === 'up' && isPaddleUp);
								let isPullingDown = (position === 'down' && !isPaddleUp);
								if (isPullingUp || isPullingDown) {
									
									return {
										x: (a.position.x - b.position.x) * PADDLE_PULL,
										y: (a.position.y - b.position.y) * PADDLE_PULL,
									};
								}
							}
						}
					]
				}
			});
		}
	
		// contact with these bodies causes pinball to be relaunched
		
		
		function reset(x, width) {

			setBalli((prev) => prev + 1)
			return Matter.Bodies.rectangle(x, 781, width, 2, {
				label: 'reset',
				isStatic: true,
				render: {
					fillStyle: '#fff'
				},
				
			});
		}
	
		window.addEventListener('load', load, false);
		
	};her()
},[])

	window.addEventListener('online',  updateOnlineStatus);
	window.addEventListener('offline', updateOnlineStatus);
	let condition
	function updateOnlineStatus(event) {
	condition = navigator.onLine ? "online" : "offline";
	// document.body.className = condition;
	
	if (condition === 'offline'){
		setContditionValue(true)
	}
	if (condition === 'online'){
		setContditionValue(false)
	}
  
}

	const openBaseWithAction = () => {
		if (snackbar) return;
		setSnackbar(
		<Snackbar
			onClose={() => setSnackbar(null)}
			// action="Поделиться"
			// onActionClick={() => setText('Добавляем метку.')}
			before={
			<Avatar size={24} style={{ background: 'var(--vkui--color_background_accent)' }}>
				<Icon16Done fill="#fff" width={14} height={14} />
			</Avatar>
			}
		>
			Игрок добавлен в таблицу лидеров!
		</Snackbar>,
		);
	};

	const openBaseWithActionMat = () => {
		if (snackbar) return;
		setSnackbar(
		<Snackbar
			onClose={() => setSnackbar(null)}
			// action="Поделиться"
			// onActionClick={() => setText('Добавляем метку.')}
			// before={
			// <Avatar size={24} style={{ background: 'var(--vkui--color_background_accent)' }}>
			// 	<Icon16Done fill="#fff" width={14} height={14} />
			// </Avatar>
			// }
		>
			Имя игрока не должно содержать мата!
		</Snackbar>,
		);
	};

	const openBaseWithActionPusto = () => {
		if (snackbar) return;
		setSnackbar(
		<Snackbar
			onClose={() => setSnackbar(null)}
			// action="Поделиться"
			// onActionClick={() => setText('Добавляем метку.')}
			// before={
			// <Avatar size={24} style={{ background: 'var(--vkui--color_background_accent)' }}>
			// 	<Icon16Done fill="#fff" width={14} height={14} />
			// </Avatar>
			// }
		>
			Поле не может быть пустым!
		</Snackbar>,
		);
	};

	const openBaseWithActionTimer = () => {
		if (snackbar) return;
		setSnackbar(
		<Snackbar
			onClose={() => setSnackbar(null)}
			// action="Поделиться"
			// onActionClick={() => setText('Добавляем метку.')}
			// before={
			// <Avatar size={24} style={{ background: 'var(--vkui--color_background_accent)' }}>
			// 	<Icon16Done fill="#fff" width={14} height={14} />
			// </Avatar>
			// }
		>
			Можно слать запросы только раз в 10 секунд
		</Snackbar>,
		);
	};

	const openBaseWithActionDubl = () => {
		if (snackbar) return;
		setSnackbar(
		<Snackbar
			onClose={() => setSnackbar(null)}
			// action="Поделиться"
			// onActionClick={() => setText('Добавляем метку.')}
			// before={
			// <Avatar size={24} style={{ background: 'var(--vkui--color_background_accent)' }}>
			// 	<Icon16Done fill="#fff" width={14} height={14} />
			// </Avatar>
			// }
		>
			Такое имя уже есть в базе. Придумайте уникальное имя!
		</Snackbar>,
		);
	};

	const openBaseWithActionUpdate = () => {
		if (snackbar) return;
		setSnackbar(
		<Snackbar
			onClose={() => setSnackbar(null)}
			// action="Поделиться"
			// onActionClick={() => setText('Добавляем метку.')}
			// before={
			// <Avatar size={24} style={{ background: 'var(--vkui--color_background_accent)' }}>
			// 	<Icon16Done fill="#fff" width={14} height={14} />
			// </Avatar>
			// }
		>
			Список игроков обновлен!
		</Snackbar>,
		);
	};

	function wallPost(){
		bridge.send('VKWebAppShowWallPostBox', {
			message: 'Я набрал ' + text2 + ' очков в игре Пинбол!\n'  + '\n'  + 'Сможешь ли ты набрать больше? https://vk.com/app51647366' , 
			attachment: 'https://vk.com/app51647366',
			owner_id: fetchedUser.id
		})
		.then( (data) => {
			// Запись отправлена на стену
			console.log(`Идентификатор записи: ${data.post_id}`);
		})
		.catch( (e) => {
			console.log("Ошибка!", e);
		})
	}

	const switchReclama = useReclama((state)=>state.setPokazReclami)
	const itemReclama = useReclama((state)=>state.pokazReclami)
	
	const Live = useSetPoint((state)=>state.live)
	const setLive = useSetPoint((state)=>state.setLive)

	const Point = useSetPoint((state)=>state.point)
	const setPoint = useSetPoint((state)=>state.setpoint)
	const ochki = ()=>{
		const text1= document.querySelector('.high-score1').innerText
		setText2(text1)
		setPoint(text1)
	}
	setInterval(ochki,1000)
	useEffect(()=>{
		vseslova()
	},[])


	


   
   function countdown2(){ // функция обратного отсчета
	//    let x = 10
	   x = x-10; 
	   if (x<0){
		   clearTimeout(timer); // таймер остановится на нуле
		   console.log('Стоп таймер');
	   }
	   else {
		   timer = setTimeout(countdown2, 1000);
		   
	   }
   }
//    countdown2()

	

	const vseslova=()=>{
		const q  = query(collection(db, "pinball"))
		async function haha(){
		  const querySnapshot = await getDocs(q);
		  const massiv3 = []
		  querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			
			massiv3.push(doc.data())
			
			const massiv4 = massiv3.sort((a,b)=> (+b.point) - (+a.point)  );
			
			
			const zzz = ()=>{
				setVseSlovaData(massiv4)
			}
			setTimeout(zzz,1000)
			
			
			
		  });
		}
		haha()
	  }

	  const vseslova1=()=>{
		const q  = query(collection(db, "pinball"))
		async function haha(){
		  const querySnapshot = await getDocs(q);
		  const massiv3 = []
		  querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			
			massiv3.push(doc.data())
			
			const massiv4 = massiv3.sort((a,b)=> (+b.point) - (+a.point)  );
			
			
			const zzz = ()=>{
				setVseSlovaData(massiv4)
			}
			setTimeout(zzz,1000)
			
			
			
		  });
		}
		haha()
		openBaseWithActionUpdate()
	  }


	const addData=()=>{
		let timer; // пока пустая переменная
		// стартовое значение обратного отсчета
		var x = 10
	   function countdown(){ // функция обратного отсчета
		//    let x = 10
		   x = x-1; 
		   if (x<0){
			   clearTimeout(timer); // таймер остановится на нуле
			   console.log('Стоп таймер');
			   setProverka(false)
		   }
		   else {
			   timer = setTimeout(countdown, 1000);
			   
		   }
	   }
		
		if (text1 === ''){
			openBaseWithActionPusto()
			return
		}

		if (proverka == true){
			
			if (x !== 0){
				openBaseWithActionTimer()
				return
			}
		}
		
		setProverka(true)
		
		if(myFilter.check(text1)){
			
			openBaseWithActionMat()
			return
		}
		if (VseSlovaData.find(item=>item.name === text1)){
			openBaseWithActionDubl()
			return
		}
		async function mde (){
			const fac = document.querySelector('.high-score1').innerText
			await setDoc(doc(db, "pinball", nanoid()), {
				name: text1,
				point: fac,

			  });
			setVseSlovaData([])
			vseslova()
			
		}
		mde()
		setText1('')
		openBaseWithAction()
		countdown()

	}


	const handleChange = (e)=>{	
		const textName = e.target.value
		const textCorrect = textName.trim()

		setText1(textCorrect)
		console.log(textCorrect)
	}
	const spin =()=>{
		setSpinValue1(false)
	}
	setTimeout(spin,1000)

    return (
	<>	


	  {spinValue&&
	  <div>
	  	<div className='parentZagr'>
			<p className='zagr'>Идет загрузка...</p>
		</div>
		<div className='spin'>
			<Spinner animation="border" />
		</div>
	  </div>

	  }
      {spinValue1===false&&
	  <Modal fullscreen={fullscreen} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
		  <div className="col-md-12 text-center">
              <h3 className="animate-charcter"> Пинбол</h3>
          </div>
		  </Modal.Title>
        </Modal.Header>
        <Modal.Body>
			
		    <Accordion >
				{text2>0&&
					<Accordion.Item eventKey="0">
					<Accordion.Header>Добавьте себя в таблицу лидеров!</Accordion.Header>
					<Accordion.Body>


					<p className='textRes'><p>Ваш лучший результат: </p> 
					<div className='w'></div>
					<div className='highRes'>{document.querySelector('.high-score1').innerText}</div></p>
					<div className='parentBtn'>
						<Input placeholder='Введите имя' value={text1} maxLength={10} className='inputStyle' onChange={handleChange} type='text'/>
						<Button className='btnStyle' onClick={addData}>
							<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
							<path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
							</svg>
						</Button>
					</div>

					</Accordion.Body>
				</Accordion.Item>}
				<Accordion.Item eventKey="1">
					<Accordion.Header>Топ 10 игроков</Accordion.Header>
					<Accordion.Body>
						<div className='tyk3'>
							<Button onClick={vseslova1} className='tyk2 tyk4'>
								<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className=" bi bi-arrow-clockwise" viewBox="0 0 16 16">
								<path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
								<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
								</svg>
							</Button>
						</div>
						
						{VseSlovaData.slice(0,10).map(item=>{
							return(
							<div className='parentP'>
								<p className='pName'>{item.name} </p>
								<p className='pPoint'>{item.point}</p>
							</div>
							)
						})}
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
			<Button onClick={wallPost} className='wall'>
			Опубликовать результат на стене!
			</Button>
			<Button onClick={()=>{
				location.reload();
			}} className='wall'>
			Перезагрузить игру
			</Button>
		</Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button className='nachat' variant="primary" onClick={handleClose}>
            Играть
          </Button>
        </Modal.Footer>
		{text && (
          <Group>
            <Div>{text}</Div>
          </Group>
        )}

        {snackbar}

		{conditionValue && 
         <div className='redParent'>
            <p className ='red'>Потеряна связь с интернетом</p>
          </div>}
      </Modal>}

		
		<div className={`alam ${show? 'zero' : ''} ${visible? 'zero' : ''}`}>
			<div className='parenContainer'>	
				<div className='container2'>
					
					<div  className="score current-score">
						<p className='ochki'>Очки</p>
						<span className='current-score1'></span>
					</div>
					<div className="score high-score">
						<p className='bestOchki'>Лучший результат</p>
						<span className='high-score1'></span>
					</div>
				</div>
			</div>
			<div className='parenContainer2Niz'>
				<div className='container2Niz'>
					<Button className='tyk' >
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-pause-fill" viewBox="0 0 16 16">
					<path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
					</svg>
					</Button>

					
					<Button className='menu' variant="primary" onClick={handleShow}>
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
					<path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
					</svg>
					</Button>

					<Button className='tyk2' >
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
					<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
					</svg>
					
					</Button> 
				</div>
			</div>
			
			<div className="container">
				<button className="trigger left-trigger"></button>
				<button className="trigger right-trigger"></button>
			</div>
		</div>

  	</>)
  ;}



export default Home;
