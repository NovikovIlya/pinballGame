import React,{useEffect, useRef, useState} from 'react';
import './Home.css'
import  Matter  from 'matter-js'
import bridge from '@vkontakte/vk-bridge';
import MatterAttractors from 'matter-attractors'
import { Link, useParams } from 'react-router-dom'
import { useSetPoint } from '../Store.jsx';
import { useReclama } from '../Store2';
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Panel, PanelHeader, Header, Group, Cell, Div, Avatar,Button } from '@vkontakte/vkui';
import { collection, query, where,getDocs,setDoc ,doc  } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import Spinner from 'react-bootstrap/Spinner';

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

	const handleClose = () => {
		
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
	
	function handleShow(breakpoint) {
		setFullscreen(breakpoint);
		setShow(true);
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
			BUMPER: '#fab005',
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
			})

			const menuKnopka = document.querySelector('.menu')
			menuKnopka.addEventListener('click',()=>{
				engine.timing.timeScale = 0
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
	
				// top bumpers (left, mid, right)
				bumper(105, 250),
				bumper(225, 250),
				bumper(345, 250),
	
				// bottom bumpers (left, right)
				bumper(165, 340),
				bumper(285, 340),
	
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
			// events for when the pinball hits stuff
			Matter.Events.on(engine, 'collisionStart', function(event) {
				let pairs = event.pairs;
				pairs.forEach(function(pair) {
					if (pair.bodyB.label === 'pinball') {
						switch (pair.bodyA.label) {
							case 'reset':
								launchPinball();
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
				} else if (e.which === 39) { // right arrow key
					isRightPaddleUp = true;
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
				})
				.on('mouseup touchend', function(e) {
					isLeftPaddleUp = false;
				});
			$('.right-trigger')
			.on('mousedown touchstart', function(e) {
					isRightPaddleUp = true;
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
	
		function pingBumper(bumper) {
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
		
		var num = 0
		function reset(x, width) {
			const tik = ()=>{
				setLive()
			}
			setTimeout(tik,1000)
			num = num + 1;
			console.log(num)
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
	

	

	const vseslova=()=>{
		const q  = query(collection(db, "pinball"))
		async function haha(){
		  const querySnapshot = await getDocs(q);
		  const massiv3 = []
		  querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			console.log('ssssss!',doc.id, " => ", doc.data());
			massiv3.push(doc.data())
			console.log('mass',massiv3)
			const massiv4 = massiv3
			
			const zzz = ()=>{
				setVseSlovaData(massiv4)
			}
			setTimeout(zzz,1000)
			
			console.log('vseSlova',VseSlovaData);
			
		  });
		}
		haha()
	  }


	const addData=()=>{
		async function mde (){
			const fac = document.querySelector('.high-score1').innerText
			await setDoc(doc(db, "pinball", text1), {
				name: text1,
				point: fac,

			  });
			setVseSlovaData([])
			vseslova()
			console.log(fac)
		}
		mde()

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
		{/* <Link to='/top'>	
			<button onClick={()=>{	
				ochki()
			}}>ТЫК</button>
		</Link>
		<button className='tyk' >ТЫК</button>
		<button className='tyk2' >ТЫК2</button> 
		<div>{Live}</div>
		<Button variant="primary" onClick={handleShow}>
        Launch demo modal
      	</Button> */}
	

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
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
			
		    <Accordion >
				{text2>0&&
					<Accordion.Item eventKey="0">
					<Accordion.Header>Accordion Item #1</Accordion.Header>
					<Accordion.Body>
					<p>Добавьте себя в таблицу результатов!</p>
					<input onChange={handleChange} type='text'/>
					<p>Ваш лучший результат: {document.querySelector('.high-score1').innerText}</p>
					<button onClick={addData}>Добавить данные</button>
					<button onClick={()=>{
						console.log('vseSlova111',VseSlovaData);
					}}>Проверка</button>
					</Accordion.Body>
				</Accordion.Item>}
				<Accordion.Item eventKey="1">
					<Accordion.Header>Accordion Item #2</Accordion.Header>
					<Accordion.Body>
						{VseSlovaData.map(item=>{
							return(
							<p>{item.name} {item.point}</p>)
						})}
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>}
		{/* <button onClick={liveAction}>узнать жизни</button>
		<div>{balli}</div>
		<h1>{Live}</h1> 
		<h3 className='livelive'></h3> */}
		
		<div className={`${show? 'zero' : ''} ${visible? 'zero' : ''}`}>
			<div className='parenContainer'>	
				<div className='container2'>
					{/* <button className='tyk' >Пауза</button>
					<button className='tyk2' >Начать</button> 
					
					<Button className='menu' variant="primary" onClick={handleShow}>
					Меню
					</Button> */}
					<div  className="score current-score">
					<p className='ochki'>Очки</p>

					<span className='current-score1'></span>
				</div>
				</div>
			</div>
			<div className='parenContainer2Niz'>
				<div className='container2Niz'>
					<button className='tyk' >Пауза</button>
					<button className='tyk2' >Начать</button> 
					
					<Button className='menu' variant="primary" onClick={handleShow}>
					Меню
					</Button>
				</div>
			</div>
			

			
			<div className="container">

				{/* <div  className="score current-score">
					<p className='ochki'>Очки</p>

					<span className='current-score1'></span>
				</div> */}
				<div className="score high-score">
					<p className='bestOchki'>Лучший результат</p>

					<span className='high-score1'></span>
				</div>
				<button className="trigger left-trigger"></button>
				<button className="trigger right-trigger"></button>
			</div>
		</div>
  	</>)
  ;}



export default Home;
