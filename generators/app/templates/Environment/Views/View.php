<?php

namespace <%= vendor %>\<%= package %>\Environment\Views;

use <%= vendor %>\<%= package %>\Instance;

class View {
    
    protected $compiler;
    protected $enigine;
    protected $finder;
    protected $factory;

    public function __construct() {
        $this->compiler = new \Xiaoler\Blade\Compilers\BladeCompiler(Instance::$CACHE_DIR);
        $this->engine = new \Xiaoler\Blade\Engines\CompilerEngine($this->compiler);
        $this->finder = new \Xiaoler\Blade\FileViewFinder([Instance::$VIEW_DIR]);
        // get an instance of factory
        $this->factory = new \Xiaoler\Blade\Factory($this->engine, $this->finder);
    }

    public static function render($template, $data = array()) {
        $self = new self();
        // render the template file and echo it
        echo $self->factory->make($template, $data)->render();
    }

    public static function get($template, $data = array()) {
        $self = new self();
        // render the template file and echo it
        return $self->factory->make($template, $data)->render();
    }
    
    public static function exists($template) {
        $self = new self();
        // render the template file and echo it
        return $self->factory->exists($template);
    }

}
