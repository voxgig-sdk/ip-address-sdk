<?php
declare(strict_types=1);

// IpAddress SDK configuration

class IpAddressConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "IpAddress",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://api.ipquery.io",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "bulk_query_i_p" => [],
                    "get_current_ip" => [],
                    "get_ip_intelligence" => [],
                ],
            ],
            "entity" => [
        'bulk_query_i_p' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'ip',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'isp',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'location',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'risk',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 3,
            ],
          ],
          'name' => 'bulk_query_i_p',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'example' => '1.1.1.1,8.8.8.8,9.9.9.9',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'ips',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                    ],
                    'query' => [
                      [
                        'active' => true,
                        'example' => 'json',
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/{ips}',
                  'parts' => [
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'ips' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'format',
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'get_current_ip' => [
          'fields' => [],
          'name' => 'get_current_ip',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 'text',
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/',
                  'parts' => [],
                  'select' => [
                    'exist' => [
                      'format',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'get_ip_intelligence' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'ip',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'isp',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'location',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'risk',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 3,
            ],
          ],
          'name' => 'get_ip_intelligence',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'example' => '1.1.1.1',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'ip',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                    ],
                    'query' => [
                      [
                        'active' => true,
                        'example' => 'json',
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/{ip}',
                  'parts' => [
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'ip' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'format',
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return IpAddressFeatures::make_feature($name);
    }
}
