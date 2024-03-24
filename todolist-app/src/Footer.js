import React from "react";
import './App.css';
import {Box, Button, Modal, Typography} from "@mui/material";

class Footer extends React.Component {
    popUpStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        height:300,
        bgcolor: '#6e0808',
        borderRadius: 100,
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    };
    render() {
        return (
            <div className="footerDiv">
                <button className="btnAddTask" onClick={this.props.openModal}>Ajouter une tâche</button>
                <Modal
                    open={this.props.open}
                    onClose={this.props.closeModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >

                    <Box sx={this.popUpStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        </Typography>
                        <input className="inputAddTask" onChange={this.props.handleInput}></input>
                        <button className="buttonModal" onClick={() => this.endAddTask()}>Ajouter</button>
                        <button className="buttonModal" onClick={this.props.closeModal}>Annuler</button>
                    </Box>
                </Modal>
                <input
                    className="searchBar"
                    placeholder="Recherche..."
                    value={this.props.searchTxt}
                    onChange={this.props.handleSearch}
                />
            </div>
        );
    }

    endAddTask() {
        this.props.addTask();
        this.props.closeModal();
    }
}

export default Footer;