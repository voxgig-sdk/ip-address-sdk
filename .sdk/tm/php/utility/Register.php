<?php
declare(strict_types=1);

// IpAddress SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

IpAddressUtility::setRegistrar(function (IpAddressUtility $u): void {
    $u->clean = [IpAddressClean::class, 'call'];
    $u->done = [IpAddressDone::class, 'call'];
    $u->make_error = [IpAddressMakeError::class, 'call'];
    $u->feature_add = [IpAddressFeatureAdd::class, 'call'];
    $u->feature_hook = [IpAddressFeatureHook::class, 'call'];
    $u->feature_init = [IpAddressFeatureInit::class, 'call'];
    $u->fetcher = [IpAddressFetcher::class, 'call'];
    $u->make_fetch_def = [IpAddressMakeFetchDef::class, 'call'];
    $u->make_context = [IpAddressMakeContext::class, 'call'];
    $u->make_options = [IpAddressMakeOptions::class, 'call'];
    $u->make_request = [IpAddressMakeRequest::class, 'call'];
    $u->make_response = [IpAddressMakeResponse::class, 'call'];
    $u->make_result = [IpAddressMakeResult::class, 'call'];
    $u->make_point = [IpAddressMakePoint::class, 'call'];
    $u->make_spec = [IpAddressMakeSpec::class, 'call'];
    $u->make_url = [IpAddressMakeUrl::class, 'call'];
    $u->param = [IpAddressParam::class, 'call'];
    $u->prepare_auth = [IpAddressPrepareAuth::class, 'call'];
    $u->prepare_body = [IpAddressPrepareBody::class, 'call'];
    $u->prepare_headers = [IpAddressPrepareHeaders::class, 'call'];
    $u->prepare_method = [IpAddressPrepareMethod::class, 'call'];
    $u->prepare_params = [IpAddressPrepareParams::class, 'call'];
    $u->prepare_path = [IpAddressPreparePath::class, 'call'];
    $u->prepare_query = [IpAddressPrepareQuery::class, 'call'];
    $u->result_basic = [IpAddressResultBasic::class, 'call'];
    $u->result_body = [IpAddressResultBody::class, 'call'];
    $u->result_headers = [IpAddressResultHeaders::class, 'call'];
    $u->transform_request = [IpAddressTransformRequest::class, 'call'];
    $u->transform_response = [IpAddressTransformResponse::class, 'call'];
});
