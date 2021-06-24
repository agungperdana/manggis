import React from 'react';
import Navbar from './Navbar';
import SubNavbar from './SubNavbar';
import Footer from './Footer';

export default function Dashboard({token}) {

    return (
		<>
			<Navbar/>
			<SubNavbar/>
			<div className="main">
				<div className="main-inner">
					<div className="container">
						<div className="row">
							<div className="span12">
								<div className="widget">
									<div className="widget-header"> 
										<i className="icon-bookmark"></i>
										<h3>Important Shortcuts</h3>
									</div>
									<div className="widget-content">
										<div className="shortcuts"> 
											<a className="shortcut" href="javascript:;">
												<i className="shortcut-icon icon-list-alt"></i>
												<span className="shortcut-label">Apps</span> 
											</a>
											<a className="shortcut" href="javascript:;">
												<i className="shortcut-icon icon-bookmark"></i>
												<span className="shortcut-label">Bookmarks</span> 
											</a>
											<a href="javascript:;" className="shortcut">
												<i className="shortcut-icon icon-signal"></i> 
												<span className="shortcut-label">Reports</span> 
											</a>
											<a href="javascript:;" className="shortcut"> 
												<i className="shortcut-icon icon-comment"></i>
												<span className="shortcut-label">Comments</span> 
											</a>
											<a className="shortcut" href="javascript:;">
												<i className="shortcut-icon icon-user"></i>
												<span className="shortcut-label">Users</span> 
											</a>
											<a className="shortcut" href="javascript:;">
												<i className="shortcut-icon icon-file"></i>
												<span className="shortcut-label">Notes</span> 
											</a>
											<a className="shortcut" href="javascript:;">
												<i className="shortcut-icon icon-picture"></i> 
												<span className="shortcut-label">Photos</span> 
											</a>
											<a className="shortcut" href="javascript:;"> 
												<i className="shortcut-icon icon-tag"></i>
												<span className="shortcut-label">Tags</span> 
											</a> 
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer/>
		</>
    )
}