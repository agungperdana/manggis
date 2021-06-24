import React from 'react';

export default function Header({token}) {

    return (
        <header className="header">
			<div className="logo-container">
				<a href="../" class="logo">
				    <img src="assets/images/logo.png" height="35" alt="Porto Admin" />
				</a>
				<div className="visible-xs toggle-sidebar-left" data-toggle-class="sidebar-left-opened" data-target="html" data-fire-event="sidebar-left-opened">
					<i className="fa fa-bars" aria-label="Toggle sidebar"></i>
				</div>
			</div>
			
				<div class="header-right">
			
					<form action="pages-search-results.html" className="search nav-form">
						<div className="input-group input-search">
							<input type="text" className="form-control" name="q" id="q" placeholder="Search..."/>
							<span className="input-group-btn">
								<button className="btn btn-default" type="submit"><i className="fa fa-search"></i></button>
							</span>
						</div>
					</form>
			
					<span className="separator"></span>
			
					<ul className="notifications">
						<li>
							<a href="#" className="dropdown-toggle notification-icon" data-toggle="dropdown">
								<i className="fa fa-tasks"></i>
								<span className="badge">3</span>
							</a>
			
							<div className="dropdown-menu notification-menu large">
								<div className="notification-title">
									<span className="pull-right label label-default">3</span>
									Tasks
								</div>
			
								<div className="content">
									<ul>
										<li>
											<p className="clearfix mb-xs">
												<span className="message pull-left">Generating Sales Report</span>
												<span className="message pull-right text-dark">60%</span>
											</p>
											<div className="progress progress-xs light">
												<div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: "60%"}}></div>
											</div>
										</li>
			
										<li>
											<p className="clearfix mb-xs">
												<span className="message pull-left">Importing Contacts</span>
												<span className="message pull-right text-dark">98%</span>
											</p>
											<div className="progress progress-xs light">
												<div className="progress-bar" role="progressbar" aria-valuenow="98" aria-valuemin="0" aria-valuemax="100" style={{width: "98%"}}></div>
											</div>
										</li>
			
										<li>
											<p className="clearfix mb-xs">
												<span className="message pull-left">Uploading something big</span>
												<span className="message pull-right text-dark">33%</span>
											</p>
											<div className="progress progress-xs light mb-xs">
												<div className="progress-bar" role="progressbar" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100" style={{width: "33%"}}></div>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</li>
						<li>
							<a href="#" className="dropdown-toggle notification-icon" data-toggle="dropdown">
								<i className="fa fa-envelope"></i>
								<span className="badge">4</span>
							</a>
			
							<div className="dropdown-menu notification-menu">
								<div className="notification-title">
									<span className="pull-right label label-default">230</span>
									Messages
								</div>
			
								<div className="content">
									<ul>
										<li>
											<a href="#" className="clearfix">
												<figure className="image">
													<img src="assets/images/!sample-user.jpg" alt="Joseph Doe Junior" className="img-circle" />
												</figure>
												<span className="title">Joseph Doe</span>
												<span className="message">Lorem ipsum dolor sit.</span>
											</a>
										</li>
										<li>
											<a href="#" className="clearfix">
												<figure className="image">
													<img src="assets/images/!sample-user.jpg" alt="Joseph Junior" className="img-circle" />
												</figure>
												<span className="title">Joseph Junior</span>
												<span className="message truncate">Truncated message. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacinia orci. Proin vestibulum eget risus non luctus. Nunc cursus lacinia lacinia. Nulla molestie malesuada est ac tincidunt. Quisque eget convallis diam, nec venenatis risus. Vestibulum blandit faucibus est et malesuada. Sed interdum cursus dui nec venenatis. Pellentesque non nisi lobortis, rutrum eros ut, convallis nisi. Sed tellus turpis, dignissim sit amet tristique quis, pretium id est. Sed aliquam diam diam, sit amet faucibus tellus ultricies eu. Aliquam lacinia nibh a metus bibendum, eu commodo eros commodo. Sed commodo molestie elit, a molestie lacus porttitor id. Donec facilisis varius sapien, ac fringilla velit porttitor et. Nam tincidunt gravida dui, sed pharetra odio pharetra nec. Duis consectetur venenatis pharetra. Vestibulum egestas nisi quis elementum elementum.</span>
											</a>
										</li>
										<li>
											<a href="#" className="clearfix">
												<figure className="image">
													<img src="assets/images/!sample-user.jpg" alt="Joe Junior" className="img-circle" />
												</figure>
												<span className="title">Joe Junior</span>
												<span className="message">Lorem ipsum dolor sit.</span>
											</a>
										</li>
										<li>
											<a href="#" className="clearfix">
												<figure className="image">
													<img src="assets/images/!sample-user.jpg" alt="Joseph Junior" className="img-circle" />
												</figure>
												<span className="title">Joseph Junior</span>
												<span className="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacinia orci. Proin vestibulum eget risus non luctus. Nunc cursus lacinia lacinia. Nulla molestie malesuada est ac tincidunt. Quisque eget convallis diam.</span>
											</a>
										</li>
									</ul>
			
									<hr />
			
									<div className="text-right">
										<a href="#" className="view-more">View All</a>
									</div>
								</div>
							</div>
						</li>
						<li>
							<a href="#" className="dropdown-toggle notification-icon" data-toggle="dropdown">
								<i className="fa fa-bell"></i>
								<span className="badge">3</span>
							</a>
			
							<div className="dropdown-menu notification-menu">
								<div className="notification-title">
									<span className="pull-right label label-default">3</span>
									Alerts
								</div>
			
								<div className="content">
									<ul>
										<li>
											<a href="#" className="clearfix">
												<div className="image">
													<i className="fa fa-thumbs-down bg-danger"></i>
												</div>
												<span className="title">Server is Down!</span>
												<span className="message">Just now</span>
											</a>
										</li>
										<li>
											<a href="#" className="clearfix">
												<div className="image">
													<i className="fa fa-lock bg-warning"></i>
												</div>
												<span className="title">User Locked</span>
												<span className="message">15 minutes ago</span>
											</a>
										</li>
										<li>
											<a href="#" className="clearfix">
												<div className="image">
													<i className="fa fa-signal bg-success"></i>
												</div>
												<span className="title">Connection Restaured</span>
												<span className="message">10/10/2014</span>
											</a>
										</li>
									</ul>
			
									<hr />
			
									<div className="text-right">
										<a href="#" className="view-more">View All</a>
									</div>
								</div>
							</div>
						</li>
					</ul>
			
					<span className="separator"></span>
			
					<div id="userbox" className="userbox">
						<a href="#" data-toggle="dropdown">
							<figure className="profile-picture">
								<img src="assets/images/!logged-user.jpg" alt="Joseph Doe" className="img-circle" data-lock-picture="assets/images/!logged-user.jpg" />
							</figure>
							<div className="profile-info" data-lock-name="John Doe" data-lock-email="johndoe@okler.com">
								<span className="name">John Doe Junior</span>
								<span className="role">administrator</span>
							</div>
			
							<i className="fa custom-caret"></i>
						</a>
			
						<div className="dropdown-menu">
							<ul className="list-unstyled">
								<li className="divider"></li>
								<li>
									<a role="menuitem" tabindex="-1" href="pages-user-profile.html"><i className="fa fa-user"></i> My Profile</a>
								</li>
								<li>
									<a role="menuitem" tabindex="-1" href="#" data-lock-screen="true"><i className="fa fa-lock"></i> Lock Screen</a>
								</li>
								<li>
									<a role="menuitem" tabindex="-1" href="pages-signin.html"><i className="fa fa-power-off"></i> Logout</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</header>
    )
}