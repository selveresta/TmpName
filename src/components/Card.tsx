import React, { FC, useState } from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../style/styleCSS/Card.css";
import { IUser } from "../types/types";
import Button from "react-bootstrap/Button";

const Card: FC<IUser> = ({ name, email, phone, id, type, clickPosts, idPost }: IUser) => {
	return (
		<Container className={type === false ? "oneCardSmall" : "oneCardSimple"}>
			<Container className='attribute'>
				<Row>
					<Col className='itemCard'>{name}</Col>
				</Row>
				<Row>
					<Col className='itemCard'>{email}</Col>
				</Row>
				<Row>
					<Col className='itemCard'>{phone}</Col>
				</Row>
				<Row>
					<Col className='itemCard'>{id}</Col>
				</Row>
			</Container>

			<Button
				onClick={() => {
					idPost(id);
					clickPosts();
				}}
				className='action-button'>
				Show All Posts
			</Button>
		</Container>
	);
};

export default Card;
