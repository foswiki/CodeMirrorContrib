# Plugin for Foswiki - The Free and Open Source Wiki, http://foswiki.org/
#
# CodeMirrorPlugin is Copyright (C) 2016-2017 Michael Daum http://michaeldaumconsulting.com
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation; either version 2
# of the License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details, published at
# http://www.gnu.org/copyleft/gpl.html

package Foswiki::Contrib::CodeMirrorContrib::Core;

use strict;
use warnings;

use Foswiki::Func ();
use Foswiki::Plugins ();
use Foswiki::Plugins::JQueryPlugin::Plugin ();

our @ISA = qw( Foswiki::Plugins::JQueryPlugin::Plugin );

sub new {
  my $class = shift;

  my $this = bless(
    $class->SUPER::new(
      name => 'CodeMirror',
      version => '5.24.2',
      author => 'Marijn Haverbeke',
      homepage => 'http://codemirror.net',
      javascript => ['lib/codemirror.js', 'addon/mode/loadmode.js', 'jquery.codemirror.js'],
      css => ['lib/codemirror.css', 'theme/foswiki.css'],
      documentation => 'CodeMirrorPlugin',
      puburl => '%PUBURLPATH%/%SYSTEMWEB%/CodeMirrorContrib',
      dependencies => ['livequery', 'ui::resizable'],
    ),
    $class
  );

  return $this;
}

1;
