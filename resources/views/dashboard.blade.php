@extends("layouts.default")

@section("content")

<div class="page-breadcrumb">
	<ol class="breadcrumb container">
		<li><a href="index.html">Home</a></li>
		<li class="active">Dashboard</li>
	</ol>
</div>
<div class="page-title">
	<div class="container">
		<h3>Dashboard</h3>
	</div>
</div>
<div id="main-wrapper" class="container">
	<div class="row">
		<div class="col-lg-3 col-md-6">
			<div class="panel info-box panel-white">
				<div class="panel-body">
					<div class="info-box-stats">
						<p class="counter">1,641</p>
						<span class="info-box-title">Boletos emitidos este mês</span>
					</div>
					<div class="info-box-icon">
						<i class="icon-users"></i>
					</div>
					<div class="info-box-progress">
						<div class="progress progress-xs progress-squared bs-n">
							<div class="progress-bar progress-bar-success" role="progressbar"
								aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"
								style="width: 40%"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-lg-3 col-md-6">
			<div class="panel info-box panel-white">
				<div class="panel-body">
					<div class="info-box-stats">
						<p class="counter">1,570</p>
						<span class="info-box-title">Boletos pagos</span>
					</div>
					<div class="info-box-icon">
						<i class="icon-eye"></i>
					</div>
					<div class="info-box-progress">
						<div class="progress progress-xs progress-squared bs-n">
							<div class="progress-bar progress-bar-info" role="progressbar"
								aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"
								style="width: 80%"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-lg-3 col-md-6">
			<div class="panel info-box panel-white">
				<div class="panel-body">
					<div class="info-box-stats">
						<p>
							<span class="counter">17</span>
						</p>
						<span class="info-box-title">Boletos vencidos</span>
					</div>
					<div class="info-box-icon">
						<i class="icon-basket"></i>
					</div>
					<div class="info-box-progress">
						<div class="progress progress-xs progress-squared bs-n">
							<div class="progress-bar progress-bar-warning" role="progressbar"
								aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
								style="width: 60%"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-lg-3 col-md-6">
			<div class="panel info-box panel-white">
				<div class="panel-body">
					<div class="info-box-stats">
						<p class="counter">47</p>
						<span class="info-box-title">Aguardando pagamento</span>
					</div>
					<div class="info-box-icon">
						<i class="icon-envelope"></i>
					</div>
					<div class="info-box-progress">
						<div class="progress progress-xs progress-squared bs-n">
							<div class="progress-bar progress-bar-danger" role="progressbar"
								aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"
								style="width: 10%"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Row -->
	<div class="row">


		<div class="col-lg-12 col-md-12">
			<div class="panel panel-white">
				<div class="panel-heading">
					<h4 class="panel-title">Últimos boletos emitidos</h4>
				</div>
				<div class="panel-body">
					<div class="table-responsive project-stats">
						<table class="table">
							<thead>
								<tr>
									<th>ID Boleto</th>
									<th>Cliente</th>
									<th>Valor</th>
									<th>Vencimento</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th scope="row">452</th>
									<td>Lojas Americas Ltda.</td>
									<td>R$ 1,590.97</td>
									<td>15/06/2015</td>
									<td><span class="label label-info">Aguardando pagamento</span></td>
								</tr>
								<tr>
									<th scope="row">333</th>
									<td>Academia Informa</td>
									<td>R$ 877.50</td>
									<td>14/06/2015</td>
									<td><span class="label label-info">Aguardando pagamento</span></td>
								</tr>
								<tr>
									<th scope="row">123</th>
									<td>Subway</td>
									<td>R$ 122.32</td>
									<td>13/06/2015</td>
									<td><span class="label label-success">Pago</span></td>
								</tr>
								<tr>
									<th scope="row">642</th>
									<td>Burguer King</td>
									<td>R$ 444.87</td>
									<td>12/06/2015</td>
									<td><span class="label label-danger">Cancelado</span></td>
								</tr>
								<tr>
									<th scope="row">551</th>
									<td>Toyota Fábrica de Carros</td>
									<td>R$ 33,500.00</td>
									<td>11/06/2015</td>
									<td><span class="label label-danger">Vencido</span></td>
								</tr>
								<tr>
									<th scope="row">447</th>
									<td>Souza Cruz</td>
									<td>R$ 8,554.05</td>
									<td>10/06/2015</td>
									<td><span class="label label-success">Pago após vencimento</span></td>
								</tr>

							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- Main Wrapper -->


@stop