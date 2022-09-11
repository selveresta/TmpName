import React, { useEffect, useState } from "react";
import { Container, Navbar, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./style/styleCSS/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { IPost, IPostState } from "./types/types";
import Card from "./components/Card";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import { useTypeSelector } from "./hooks/useTypeSelector";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./store/action-creators/user";
import { fetchPosts } from "./store/action-creators/posts";

function App() {
	const normalSize: number = 12;
	const hiddenSize: number = 0;

	const { users, error, loading } = useTypeSelector((state) => state.user);
	const posts: IPostState = useTypeSelector((state) => state.post);
	const [usedPosts, setUsedPost] = useState<IPost[]>([]);
	const dispatch = useDispatch();
	//const [users, setUsers] = useState<IUser[]>([]);
	const [typeCard, setCardType] = useState<boolean>(true);

	const [userIdPost, setUserIdPost] = useState<number>(0);

	const [page, setPage] = useState<number>(0);
	const [isDialogOpen, setOpened] = useState<boolean>(false);
	const [normalSizeCard, setNormalSize] = useState<number>(12);
	const [middleSize, setMiddleSize] = useState<number>(6);
	const [dialogSizeHidden, setDialogSizeHidden] = useState<number>(0);

	useEffect(() => {
		const a = fetchUsers();
		const b = fetchPosts();
		b(dispatch);
		a(dispatch);
	}, []);

	useEffect(() => {
		setUsedPost(getPostsById());
	}, [userIdPost]);

	function nextPage() {
		if (page >= users.length) {
			return;
		}
		setPage(page + 4);
	}

	function previousPage() {
		if (page === 0) {
			return;
		}
		setPage(page - 4);
	}

	function openPosts() {
		if (isDialogOpen === true) {
			changeSizeCard();
			setNormalSize(normalSize);
			setDialogSizeHidden(hiddenSize);
			setOpened(false);
		} else {
			changeSizeCard();
			setNormalSize(middleSize);
			setDialogSizeHidden(middleSize);
			setOpened(true);
		}
	}

	function changeSizeCard(): void {
		setCardType(!typeCard);
	}

	function setIdPostForUser(id: number): void {
		setUserIdPost(id);
	}

	function getPostsById(): IPost[] {
		let arr: IPost[] = [];
		posts.posts.map((post: IPost) => {
			if (post.userId === userIdPost) {
				arr.push(post);
			}
		});
		return arr;
	}

	return (
		<div className='App'>
			<Container>
				<Navbar className='header'>
					<Button>Sort By Name</Button>
					<Form className='d-flex'>
						<Form.Control type='search' placeholder='Search' className='me-2 control' aria-label='Search' />
						<Button variant='outline-success'>Search</Button>
					</Form>
				</Navbar>
				<Container className='mainContent'>
					<Row>
						<Col md={normalSizeCard}>
							{users.length !== 0 ? (
								<Container>
									<Row>
										<Col className='right'>
											{users[page] !== undefined ? (
												<Card
													name={users[page].name}
													email={users[page].email}
													phone={users[page].phone}
													id={users[page].id}
													type={typeCard}
													clickPosts={openPosts}
													idPost={setIdPostForUser}></Card>
											) : (
												<div></div>
											)}
										</Col>
										<Col>
											{users[page + 1] !== undefined ? (
												<Card
													name={users[page + 1].name}
													email={users[page + 1].email}
													phone={users[page + 1].phone}
													id={users[page + 1].id}
													type={typeCard}
													clickPosts={openPosts}
													idPost={setIdPostForUser}></Card>
											) : (
												<div></div>
											)}
										</Col>
									</Row>
									<Row>
										<Col className='right'>
											{users[page + 2] !== undefined ? (
												<Card
													name={users[page + 2].name}
													email={users[page + 2].email}
													phone={users[page + 2].phone}
													id={users[page + 2].id}
													type={typeCard}
													clickPosts={openPosts}
													idPost={setIdPostForUser}></Card>
											) : (
												<div></div>
											)}
										</Col>
										<Col>
											{users[page + 3] !== undefined ? (
												<Card
													name={users[page + 3].name}
													email={users[page + 3].email}
													phone={users[page + 3].phone}
													id={users[page + 3].id}
													type={typeCard}
													clickPosts={openPosts}
													idPost={setIdPostForUser}></Card>
											) : (
												<div></div>
											)}
										</Col>
									</Row>
								</Container>
							) : (
								<div></div>
							)}
						</Col>
						<Col md={dialogSizeHidden}>
							{isDialogOpen === true ? (
								<Col>
									<Container className='cardPosts'>
										<Accordion className='accordion' flush>
											{usedPosts.map((post: IPost, index: number) => (
												<Accordion.Item key={index++} eventKey={(index++).toString()}>
													<Accordion.Header className='accordionHeader'>
														Title {index}. {post.title}
													</Accordion.Header>
													<Accordion.Body className='accordionBody'>
														{post.body}
													</Accordion.Body>
												</Accordion.Item>
											))}
										</Accordion>
									</Container>
								</Col>
							) : (
								<div></div>
							)}
						</Col>
					</Row>
				</Container>
				<Container className='npBtns'>
					<Row>
						<Col className='btn-left'>
							<Button onClick={previousPage} className='mybtn'>
								Previous
							</Button>
						</Col>
						<Col className='btn-right'>
							<Button onClick={nextPage} className='mybtn'>
								Next
							</Button>
						</Col>
					</Row>
				</Container>
			</Container>
		</div>
	);
}

export default App;
