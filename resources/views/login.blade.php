<!DOCTYPE html>
<html>
    <head>
        
        <!-- Title -->
        <title>Modern | Login - Sign in</title>
        
        <meta content="width=device-width, initial-scale=1" name="viewport"/>
        <meta charset="UTF-8">
        <meta name="description" content="Admin Dashboard Template" />
        <meta name="keywords" content="admin,dashboard" />
        <meta name="author" content="MyBoletos" />
        
        <!-- Styles -->
        <link href="<?php echo APP_PATH; ?>/assets/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="<?php echo APP_PATH; ?>/assets/css/login.css" rel="stylesheet" type="text/css"/>
        
        <!-- Theme Styles -->
        <link href="<?php echo APP_PATH; ?>/assets/css/modern.min.css" rel="stylesheet" type="text/css"/>
        
        
        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
        
    </head>
    <body class="page-login">
        <main class="page-content">
            <div class="page-inner">
                <div id="main-wrapper">
                    <div class="row">
                        <div class="col-md-3 center">
                            <div class="login-box">
                                <a href="index.html" class="logo-name text-lg text-center">MyBoletos</a>
                                <p class="text-center m-t-md">Digite os dados da sua conta.</p>
                                <form class="m-t-md" method="POST" action="app/home">
                                    <div class="form-group">
                                        <input type="email" class="form-control" value='leonardo.ferreira.caldas@gmail.com' placeholder="Email" required>
                                    </div>
                                    <div class="form-group">
                                        <input type="password" class="form-control" value='12345' placeholder="Senha" required>
                                    </div>
                                    <button type="submit" class="btn btn-success btn-block">Login</button>
                                    <a href="forgot.html" class="display-block text-center m-t-md text-sm">Esqueceu sua senha?</a>
                                    <p class="text-center m-t-xs text-sm">Você ainda não possui uma conta?</p>
                                    <a href="register.html" class="btn btn-default btn-block m-t-md">Crie uma conta agora</a>
                                </form>
                                <p class="text-center m-t-xs text-sm">2015 &copy; MyBoletos</p>
                            </div>
                        </div>
                    </div><!-- Row -->
                </div><!-- Main Wrapper -->
            </div><!-- Page Inner -->
        </main><!-- Page Content -->
	
        
    </body>
</html>