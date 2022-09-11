import React, { useEffect, useState } from "react";
import { Container, Navbar, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./style/styleCSS/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { IPost, IPostState, IUser, UserActionTypes } from "./types/types";
import Card from "./components/Card";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import { useTypeSelector } from "./hooks/useTypeSelector";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./store/action-creators/user";
import { fetchPosts } from "./store/action-creators/posts";
import Modal from "react-bootstrap/Modal";

function App() {
	const normalSize: number = 12;
	const hiddenSize: number = 0;
	const dispatch = useDispatch();

	const { users, error, loading, sortedUsers } = useTypeSelector((state) => state.user);
	const posts: IPostState = useTypeSelector((state) => state.post);

	const [usedPosts, setUsedPost] = useState<IPost[]>([]);
	const [isSorted, setIsSorted] = useState<boolean>(false);
	const [typeCard, setCardType] = useState<boolean>(true);
	const [userIdPost, setUserIdPost] = useState<number>(0);
	const [page, setPage] = useState<number>(0);
	const [isDialogOpen, setOpened] = useState<boolean>(false);
	const [normalSizeCard, setNormalSize] = useState<number>(12);
	const [middleSize, setMiddleSize] = useState<number>(6);
	const [dialogSizeHidden, setDialogSizeHidden] = useState<number>(0);
	const [showedUsers, setShowedUsers] = useState<IUser[]>([]);
	const [searchValue, setSearchValue] = useState<string>("");
	const [searchedUser, setSearchedUser] = useState<IUser>();
	const [show, setShow] = useState(false);

	useEffect(() => {
		const a = fetchUsers();
		const b = fetchPosts();
		b(dispatch);
		a(dispatch);
	}, []);

	useEffect(() => {
		setShowedUsers(users);
	}, [users]);

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

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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

	function sortUsers(arr: IUser[]): IUser[] {
		return arr.sort((a, b) => {
			if (a.name > b.name) return 1;
			if (a.name < b.name) return -1;
			return 0;
		});
	}

	function showSortedUsers() {
		setIsSorted(true);
		dispatch({ type: UserActionTypes.SET_USERS, payload: sortUsers(users) });
	}

	function hideSortedUser() {
		if (isSorted === true) {
			setIsSorted(false);
		}
	}

	function searchUser(name: string) {
		for (let i = 0; i < users.length; i++) {
			const element = users[i];
			if (element.name === name) {
				return element;
			}
		}
		return undefined;
	}

	function showSearchedUser(): void {
		try {
			setSearchedUser(searchUser(searchValue));
			if (searchedUser !== undefined) {
				setIdPostForUser(searchedUser.id);
			}
			handleShow();
		} catch (error) {
			alert(error);
		}
	}

	return (
		<div className='App'>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{searchedUser !== undefined ? searchedUser.name : "Not Found user"}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{searchedUser !== undefined ? (
						<Accordion className='accordion' flush>
							{usedPosts.map((post: IPost, index: number) => (
								<Accordion.Item key={index++} eventKey={(index++).toString()}>
									<Accordion.Header className='accordionHeader'>
										Title {index}. {post.title}
									</Accordion.Header>
									<Accordion.Body className='accordionBody'>{post.body}</Accordion.Body>
								</Accordion.Item>
							))}
						</Accordion>
					) : (
						"Posts not Found"
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>

			<Container>
				<Navbar className='header'>
					<Container>
						<Row>
							<Col>
								<Button onClick={showSortedUsers}>Sort</Button>
							</Col>
							{/* <Col>
								<Button onClick={hideSortedUser}>Unsort</Button>
							</Col> */}
						</Row>
					</Container>
					<Form className='d-flex'>
						<Form.Control
							value={searchValue}
							onChange={(event) => setSearchValue(event.target.value)}
							type='search'
							placeholder='Search'
							className='me-2 control'
							aria-label='Search'
						/>
						<Button
							onClick={() => {
								showSearchedUser();
							}}
							variant='outline-success'>
							Search
						</Button>
					</Form>
				</Navbar>
				<Container className='mainContent'>
					<Row className='cards'>
						<Col md={normalSizeCard}>
							{showedUsers.length !== 0 ? (
								<Container>
									<Row>
										<Col className='right'>
											{showedUsers[page] !== undefined ? (
												<Card
													name={showedUsers[page].name}
													email={showedUsers[page].email}
													phone={showedUsers[page].phone}
													id={showedUsers[page].id}
													type={typeCard}
													clickPosts={openPosts}
													idPost={setIdPostForUser}></Card>
											) : (
												<div></div>
											)}
										</Col>
										<Col>
											{showedUsers[page + 1] !== undefined ? (
												<Card
													name={showedUsers[page + 1].name}
													email={showedUsers[page + 1].email}
													phone={showedUsers[page + 1].phone}
													id={showedUsers[page + 1].id}
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
											{showedUsers[page + 2] !== undefined ? (
												<Card
													name={showedUsers[page + 2].name}
													email={showedUsers[page + 2].email}
													phone={showedUsers[page + 2].phone}
													id={showedUsers[page + 2].id}
													type={typeCard}
													clickPosts={openPosts}
													idPost={setIdPostForUser}></Card>
											) : (
												<div></div>
											)}
										</Col>
										<Col>
											{showedUsers[page + 3] !== undefined ? (
												<Card
													name={showedUsers[page + 3].name}
													email={showedUsers[page + 3].email}
													phone={showedUsers[page + 3].phone}
													id={showedUsers[page + 3].id}
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
