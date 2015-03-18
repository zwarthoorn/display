<h1>Hallo allemaal</h1>

<?php foreach($messages as $message): ?>
<p>Author: <?php echo $message['author']; ?></p>
<?php endforeach; ?>