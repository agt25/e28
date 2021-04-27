<?php $__env->startSection('body'); ?>

<h1 data-test='api-heading'>API</h1>

<!--
SESSION_COOKIE: <?php echo e(config('session.cookie')); ?>

SESSION_DOMAIN: <?php echo e(config('session.domain')); ?>

SESSION_SECURE_COOKIE: <?php echo e(config('session.secure') ? 'TRUE' : 'FALSE'); ?>

CORS_ALLOWED_ORIGINS: <?php $__currentLoopData = config('cors.allowed_origins'); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $config): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?> <?php echo e($config); ?> <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
SANCTUM_STATEFUL_DOMAINS: <?php $__currentLoopData = config('sanctum.stateful'); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $config): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?> <?php echo e($config); ?> <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?> 
-->

<section>
    <h2>Routes</h2>

    <h3>Authorization</h3>
    <table class='table table-light table-striped table-bordered table-sm'>
        <thead class='thead-light'>
            <tr>
                <th>Name</th>
                <th>HTTP Method</th>
                <th>URL</th>
                <th>Usage & Params</th>
            </tr>
        </thead>

        <tr>
            <td>login</td>
            <td><code>POST</code></code></td>
            <td><code>/login</code></td>
            <td>Log in a user (expects params: <code>email</code>, <code>password</code>); includes a <em>Set-Cookie</em> HTTP response header if successful.</em></td>
        </tr>
        <tr>
            <td>auth</td>
            <td><code>POST</code></code></td>
            <td><code>/auth</code></td>
            <td>Check a visitor’s authentication status.</td>
        </tr>
        <tr>
            <td>logout</td>
            <td><code>POST</code></td>
            <td><code>/logout</code></td>
            <td>Log out a user.</td>
        </tr>
        <tr>
            <td>register</td>
            <td><code>POST</code></td>
            <td><code>/register</code></td>
            <td>Register a new user (expects params: <code>name</code>, <code>email</code>, <code>password</code>).</td>
        </tr>
    </table>


    <h3>Testing</h3>
    <table class='table table-light table-striped table-bordered table-sm'>
        <thead class='thead-light'>
            <tr>
                <th>Name</th>
                <th>HTTP Method</th>
                <th>URL</th>
                <th>Usage & Params</th>
            </tr>
        </thead>

        <tr>
            <td>refresh</td>
            <td><code>GET</code></code></td>
            <td><code>/refresh</code></td>
            <td>Clears any existing data for resources and re-runs seeds, giving application a “fresh start” for testing purposes.</em></td>
        </tr>

        <tr>
            <td>login-as</td>
            <td><code>POST</code></code></td>
            <td><code>/login-as/{user_id}</code></td>
            <td>Log in a user by id. Utility for testing purposes, e.g. <code>cy.visit('/login-as/' + user.id);</code>. Only works for requests coming from a .loc domain.</td>
        </tr>

    </table>

    <?php $__currentLoopData = $resources; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $resourceName => $resource): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
    <h3>Resource: <code><?php echo e($resourceName); ?></code></h3>
    <p>

        <div class='permission-level'>
            Permission level:
            <?php echo e($resource->permission_level); ?>

            <em>(<?php echo e($permission_levels[$resource->permission_level]); ?>)</em>
        </div>
    </p>

    <table class='table table-light table-striped table-bordered table-sm'>
        <thead class='thead-light'>
            <tr>
                <th>Name</th>
                <th>HTTP Method</th>
                <th>URL</th>
                <th>Usage & Params</th>
            </tr>
        </thead>
        <tr>
            <td>index</td>
            <td><code>GET</code></td>
            <td><code>/<?php echo e($resourceName); ?></code></td>
            <td>Show all <em><?php echo e(Str::plural($resourceName)); ?></em>.</td>
        </tr>
        <tr>
            <td>show</td>
            <td><code>GET</code></td>
            <td><code>/<?php echo e($resourceName); ?>/{id}</code></td>
            <td>Show an individual <em><?php echo e($resourceName); ?></em>.</td>
        </tr>
        <tr>
            <td>query</td>
            <td><code>GET</code></td>
            <td><code>/<?php echo e($resourceName); ?>/query?field=value&field=value</code></td>
            <td>Query a <em><?php echo e($resourceName); ?></em> by the given field params.</td>
        </tr>
        <tr>
            <td>store</td>
            <td><code>POST</code></td>
            <td><code>/<?php echo e($resourceName); ?></code></td>
            <td>Store a new <em><?php echo e($resourceName); ?></em>.</td>
        </tr>
        <tr>
            <td>update</td>
            <td><code>PUT</code></td>
            <td><code>/<?php echo e($resourceName); ?>/{id}</code></td>
            <td>Update an existing <em><?php echo e($resourceName); ?></em></td>
        </tr>
        <tr>
            <td>destroy</td>
            <td><code>DELETE</code></td>
            <td><code>/<?php echo e($resourceName); ?>/{id}</code></td>
            <td>Delete an existing <em><?php echo e($resourceName); ?></em></td>
        </tr>


        </tbody>
    </table>
    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>


</section>

<section>
    <h2>Database</h2>
    <small>
        Note: Because this API is designed for demonstration purposes, this database info is publicly viewable. In a

        real-world application, this information should be restricted.
    </small>

    <?php if($database): ?>
    <?php $__currentLoopData = $database; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $table => $data): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
    <div class='db-table table-responsive'>
        <h5><?php echo e($table); ?></h5>

        <?php if($data == null): ?>
        <small class='text-muted'>No data</small>
        <?php else: ?>

        <table class='table table-light table-sm table-striped table-bordered'>
            <thead class="thead-dark">
                <tr>
                    <?php $__currentLoopData = $data[0]; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $key => $value): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <th scope="col"><?php echo e($key); ?></th>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </tr>
            </thead>
            <tbody>
                <?php $__currentLoopData = $data; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $row): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <tr>
                    <?php $__currentLoopData = $row; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $key => $value): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <td><?php echo e($key == 'password' ? '***' : $value); ?></td>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </tr>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </tbody>

        </table>

        <?php endif; ?>
    </div>

    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    <?php endif; ?>
</section>

<?php $__env->stopSection(); ?>

<?php echo $__env->make('master', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /Applications/XAMPP/xamppfiles/htdocs/e28/e28api/core/resources/views/index.blade.php ENDPATH**/ ?>