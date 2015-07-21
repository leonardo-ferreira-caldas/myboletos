<!DOCTYPE html>
<html>
<head>

<!-- Title -->
<title>MyBoletos</title>

<meta content="width=device-width, initial-scale=1" name="viewport" />
<meta charset="UTF-8">
<meta name="description" content="Admin Dashboard Template" />
<meta name="keywords" content="admin,dashboard" />
<meta name="author" content="Steelcoders" />
<meta name="csrf-token" content="{{ csrf_token() }}">

<!-- Styles -->
<link href='http://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700' rel='stylesheet' type='text/css'>
<link href="/css/pace-theme-flash.css" rel="stylesheet" />
<link href="/css/uniform.default.min.css" rel="stylesheet" />
<link href="/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link href="/css/font-awesome.css" rel="stylesheet" type="text/css" />
<link href="/css/simple-line-icons.css" rel="stylesheet" type="text/css" />
<link href="/css/waves.min.css" rel="stylesheet" type="text/css" />
<link href="/css/switchery.min.css" rel="stylesheet" type="text/css" />
<link href="/css/style.css" rel="stylesheet" type="text/css" />
<link href="/css/component.css" rel="stylesheet" type="text/css" />
<link href="/css/weather-icons.min.css" rel="stylesheet" type="text/css" />
<link href="/css/MetroJs.min.css" rel="stylesheet" type="text/css" />
<link href="/css/toastr.min.css" rel="stylesheet" type="text/css" />
<link href="/css/allinone.css" rel="stylesheet" type="text/css" />
<link href="/css/alert.css" rel="stylesheet" type="text/css" />
<link href="/css/jquery-impromptu.css" rel="stylesheet" type="text/css" />
<link href="/css/modern.min.css" rel="stylesheet" type="text/css" />
<link href="/css/selectric.css" rel="stylesheet" type="text/css" />

<!-- Theme Styles -->
<script src="/plugins/jquery-1.11.3.min.js" type="text/javascript"></script>
<script src="/plugins/jquery_plugins.js" type="text/javascript"></script>
<script src="/plugins/jquery-impromptu.js" type="text/javascript"></script>
<script src="/plugins/utils.js" type="text/javascript"></script>
<script src="/plugins/jquery.mask.js"></script>
<script src="/plugins/jquery.modal.js"></script>


<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->

</head>
<body class="compact-menu page-horizontal-bar">

	<div class="overlay"></div>
	<main class="page-content content-wrap">
	<div class="navbar">
		<div class="navbar-inner container">
			<div class="sidebar-pusher">
				<a href="/javascript:void(0);"
					class="waves-effect waves-button waves-classic push-sidebar"> <i
					class="fa fa-bars"></i>
				</a>
			</div>
			<div class="logo-box">
				<a href="/dashboard" class="logo-text"><span>MyBoletos</span></a>
			</div>
			<!-- Logo Box -->
			<div class="search-button">
				<a href="javascript:void(0);"
					class="waves-effect waves-button waves-classic show-search"><i
					class="fa fa-search"></i></a>
			</div>
			<div class="topmenu-outer">
				<div class="top-menu">
					<ul class="nav navbar-nav navbar-left">
						<li><a href="/javascript:void(0);"
							class="waves-effect waves-button waves-classic sidebar-toggle"><i
								class="fa fa-bars"></i></a></li>
					</ul>
					<ul class="nav navbar-nav navbar-right">

						<li class="dropdown"><a href="#"
							class="dropdown-toggle waves-effect waves-button waves-classic"
							data-toggle="dropdown"> <span class="user-name">Leonardo<i
									class="fa fa-angle-down"></i></span> <img
								class="img-circle avatar"
								src="/img/avatar.jpg" width="40"
								height="40" alt="">
						</a></li>
					</ul>
					<!-- Nav -->
				</div>
				<!-- Top Menu -->
			</div>
		</div>
	</div>
	<!-- Navbar -->
	<div class="page-sidebar sidebar horizontal-bar">
		<div class="page-sidebar-inner">
			<ul class="menu accordion-menu container">
				<li class="nav-heading"><span>Navigation</span></li>
				<li class="active"><a href="/dashboard"><span
						class="menu-icon icon-speedometer"></span>
					<p>Dashboard</p></a></li>
				<li><a href="/clientes/"><span class="menu-icon icon-users"></span>
					<p>Clientes</p></a></li>
				<li><a href="/contas-bancarias/"><span class="menu-icon icon-wallet"></span>
					<p>Contas Bancárias</p></a></li>
				<li><a href="/boletos/"><span class="menu-icon icon-docs"></span>
					<p>Boletos</p></a></li>
				<li><a href="/relatorios"><span class="menu-icon icon-bar-chart"></span>
					<p>Relatórios</p></a></li>
				<li><a href="/profile/"><span class="menu-icon icon-note"></span>
					<p>Configurações da Conta</p></a></li>
			</ul>
		</div>
		<!-- Page Sidebar Inner -->
	</div>
	<!-- Page Sidebar -->
	<div class="page-inner">
	
		@yield("content")
	
	
        <div class="page-footer">
        	<div class="container">
            	<p class="no-s">2015 &copy; MyBoletos.</p>
            </div>
        </div>
	</div><!-- Page Inner -->
	</main><!-- Page Content -->
    <div class="cd-overlay"></div>
    <div id="alert">
    	<div id="alert-wrapper">
        	<div id="alert-cell-wrapper">
        		<div id="alert-content">
        			<div id="alert-header">
        				<h1>Sucesso!</h1>
       				</div>
       				<div id="alert-body">
       					<p>Registro deletado com sucesso.</p>
       					<div id='alert-buttons'></div>
       				</div>
       			</div>
       		</div>
       	</div>
	</div>
    <script src="/plugins/allinone.js" type="text/javascript"></script>
   </body>
</html>
	
	