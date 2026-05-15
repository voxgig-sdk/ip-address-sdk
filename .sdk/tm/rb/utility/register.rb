# IpAddress SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

IpAddressUtility.registrar = ->(u) {
  u.clean = IpAddressUtilities::Clean
  u.done = IpAddressUtilities::Done
  u.make_error = IpAddressUtilities::MakeError
  u.feature_add = IpAddressUtilities::FeatureAdd
  u.feature_hook = IpAddressUtilities::FeatureHook
  u.feature_init = IpAddressUtilities::FeatureInit
  u.fetcher = IpAddressUtilities::Fetcher
  u.make_fetch_def = IpAddressUtilities::MakeFetchDef
  u.make_context = IpAddressUtilities::MakeContext
  u.make_options = IpAddressUtilities::MakeOptions
  u.make_request = IpAddressUtilities::MakeRequest
  u.make_response = IpAddressUtilities::MakeResponse
  u.make_result = IpAddressUtilities::MakeResult
  u.make_point = IpAddressUtilities::MakePoint
  u.make_spec = IpAddressUtilities::MakeSpec
  u.make_url = IpAddressUtilities::MakeUrl
  u.param = IpAddressUtilities::Param
  u.prepare_auth = IpAddressUtilities::PrepareAuth
  u.prepare_body = IpAddressUtilities::PrepareBody
  u.prepare_headers = IpAddressUtilities::PrepareHeaders
  u.prepare_method = IpAddressUtilities::PrepareMethod
  u.prepare_params = IpAddressUtilities::PrepareParams
  u.prepare_path = IpAddressUtilities::PreparePath
  u.prepare_query = IpAddressUtilities::PrepareQuery
  u.result_basic = IpAddressUtilities::ResultBasic
  u.result_body = IpAddressUtilities::ResultBody
  u.result_headers = IpAddressUtilities::ResultHeaders
  u.transform_request = IpAddressUtilities::TransformRequest
  u.transform_response = IpAddressUtilities::TransformResponse
}
